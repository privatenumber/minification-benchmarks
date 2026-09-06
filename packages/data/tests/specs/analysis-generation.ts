import { setTimeout as sleep } from 'node:timers/promises';
import { expect, test } from 'manten';
import type {
	LanguageModelV3,
	LanguageModelV3CallOptions,
	LanguageModelV3GenerateResult,
	LanguageModelV3Prompt,
} from '@ai-sdk/provider';
import { analyzedData } from '../fixtures.ts';
import { getAiAnalysis } from '../../update-readme/ai-analysis/index.ts';

const textResult = (text: string): LanguageModelV3GenerateResult => ({
	content: [{
		type: 'text',
		text,
	}],
	finishReason: {
		unified: 'stop',
		raw: 'stop',
	},
	usage: {
		inputTokens: {
			total: 1,
			noCache: 1,
			cacheRead: 0,
			cacheWrite: 0,
		},
		outputTokens: {
			total: 1,
			text: 1,
			reasoning: 0,
		},
	},
	warnings: [],
});

const extractPromptText = (prompt: LanguageModelV3Prompt) => prompt
	.map(message => (typeof message.content === 'string'
		? message.content
		: message.content.map(part => (part.type === 'text' ? part.text : '')).join('')))
	.join('\n');

type MockContext = {
	prompt: string;
	callIndex: number;
	abortSignal: AbortSignal | undefined;
};

const createMockModel = (respond: (context: MockContext) => Promise<string> | string) => {
	const calls: Array<{ prompt: string }> = [];
	const events: string[] = [];
	const model: LanguageModelV3 = {
		specificationVersion: 'v3',
		provider: 'mock',
		modelId: 'mock-model',
		supportedUrls: {},
		doGenerate: async (options: LanguageModelV3CallOptions) => {
			// Simulate a provider rejecting requests that were already aborted
			if (options.abortSignal?.aborted) {
				throw new Error('The operation was aborted');
			}

			const prompt = extractPromptText(options.prompt);
			const callIndex = calls.length;
			calls.push({ prompt });
			events.push(`start:${callIndex}`);
			const text = await respond({
				prompt,
				callIndex,
				abortSignal: options.abortSignal,
			});
			events.push(`end:${callIndex}`);
			return textResult(text);
		},
		doStream: () => {
			throw new Error('doStream is not used by this workflow');
		},
	};
	return {
		model,
		calls,
		events,
	};
};

const createDeferred = () => Promise.withResolvers<void>();

const waitFor = async (condition: () => boolean) => {
	for (let attempt = 0; attempt < 100; attempt += 1) {
		if (condition()) {
			return;
		}
		await sleep(10);
	}
	throw new Error('Condition was not met');
};

/** Rejects once the shared abort signal fires; settles via the gate otherwise. */
const abortableGate = (
	abortSignal: AbortSignal | undefined,
	onAbort: () => void,
	gate: Promise<string>,
) => Promise.race([
	new Promise<never>((_resolve, reject) => {
		abortSignal?.addEventListener('abort', () => {
			onAbort();
			reject(new Error('The operation was aborted'));
		}, { once: true });
	}),
	gate,
]);

const getCall = (
	calls: Array<{ prompt: string }>,
	marker: string,
) => calls.find(({ prompt }) => prompt.includes(marker));

test('rounds run in order with measured history and narrative context', async () => {
	const { model, calls, events } = createMockModel(({ prompt }) => {
		if (prompt.includes('# Scoreboard summary')) {
			return JSON.stringify({
				intro: 'overview intro',
				conclusion: 'overview conclusion',
			});
		}
		return JSON.stringify({
			commentary: prompt.includes('# Results — react') ? 'react commentary' : 'd3 commentary',
		});
	});

	const analysis = await getAiAnalysis(analyzedData, {
		apiKey: 'test',
		model,
	});

	expect(analysis).toStrictEqual({
		intro: 'overview intro',
		rounds: {
			react: 'react commentary',
			d3: 'd3 commentary',
		},
		conclusion: 'overview conclusion',
	});
	expect(calls).toHaveLength(3);

	// One commentary request per artifact, plus the overview; the second
	// round starts only after the first completes
	const d3CallIndex = calls.findIndex(({ prompt }) => prompt.includes('# Results — d3'));
	expect(events.indexOf('end:0')).toBeLessThan(events.indexOf(`start:${d3CallIndex}`));

	// First round: own results only, no history, next-artifact metadata only
	const reactPrompt = getCall(calls, '# Results — react')!.prompt;
	expect(reactPrompt).toContain('# Results — react');
	expect(reactPrompt).toContain('minifiedBytes=20, minzippedBytes=10, gzipReduction=75%, averageTimeMs=30, runtimeRelativeToFastest=1.0x');
	expect(reactPrompt).not.toContain('Previous rounds');
	expect(reactPrompt).toContain('# Next artifact');
	expect(reactPrompt).toContain('d3 at 200 original bytes');
	expect(reactPrompt).not.toContain('minifiedBytes=40');
	expect(reactPrompt).not.toContain('minifiedBytes=38');

	// Second round: measured history, narrative context, cumulative totals,
	// and no next artifact because it is the last round
	const d3Prompt = getCall(calls, '# Results — d3')!.prompt;
	expect(d3Prompt).toContain('# Previous rounds');
	expect(d3Prompt).toContain('1. react: best overall balance=@swc/core (10 minzipped bytes, 30 ms)');
	expect(d3Prompt).toContain(
		'Previous commentary for react (narrative context, not evidence): "react commentary"',
	);
	expect(d3Prompt).toContain('# Cumulative totals through 1 previous round');
	expect(d3Prompt).toContain('terser: completed=0, failed=1');
	expect(d3Prompt).not.toContain('# Next artifact');

	// The overview is grounded in computed facts, not generated prose
	const overviewPrompt = getCall(calls, '# Scoreboard summary')!.prompt;
	expect(overviewPrompt).toContain('In total, 3 minifier configurations competed');
	expect(overviewPrompt).not.toContain('react commentary');
	expect(overviewPrompt).not.toContain('d3 commentary');
});

test('overview completing after the rounds does not disturb association', async () => {
	const overviewGate = createDeferred();
	const { model } = createMockModel(async ({ prompt }) => {
		if (prompt.includes('# Scoreboard summary')) {
			await overviewGate.promise;
			return JSON.stringify({
				intro: 'overview intro',
				conclusion: 'overview conclusion',
			});
		}
		return JSON.stringify({
			commentary: prompt.includes('# Results — react')
				? 'react commentary'
				: 'd3 commentary',
		});
	});

	const analysisPromise = getAiAnalysis(analyzedData, {
		apiKey: 'test',
		model,
	});
	overviewGate.resolve();

	expect(await analysisPromise).toStrictEqual({
		intro: 'overview intro',
		rounds: {
			react: 'react commentary',
			d3: 'd3 commentary',
		},
		conclusion: 'overview conclusion',
	});
});

test('overview failure aborts the in-flight round and stops later rounds', async () => {
	const overviewGate = createDeferred();
	const artifactGate = createDeferred();
	let reactAborted = false;

	const { model, calls } = createMockModel(({ prompt, abortSignal }) => {
		if (prompt.includes('# Scoreboard summary')) {
			return overviewGate.promise.then(() => {
				throw new Error('overview exploded');
			});
		}
		return abortableGate(abortSignal, () => {
			reactAborted = true;
		}, artifactGate.promise.then(() => JSON.stringify({ commentary: 'late commentary' })));
	});

	const analysisPromise = getAiAnalysis(analyzedData, {
		apiKey: 'test',
		model,
	});
	await waitFor(() => calls.length === 2);
	overviewGate.reject(new Error('overview exploded'));

	await expect(analysisPromise).rejects.toThrow('AI analysis failed for the overview');

	// The in-flight round observed the abort and no further round started
	expect(reactAborted).toBe(true);
	expect(getCall(calls, '# Results — d3')).toBeUndefined();
});

test('artifact failure aborts the overview and stops later rounds', async () => {
	const reactGate = createDeferred();
	const overviewGate = createDeferred();
	let overviewAborted = false;

	const { model, calls } = createMockModel(({ prompt, abortSignal }) => {
		if (prompt.includes('# Scoreboard summary')) {
			return abortableGate(abortSignal, () => {
				overviewAborted = true;
			}, overviewGate.promise.then(() => JSON.stringify({
				intro: 'i',
				conclusion: 'c',
			})));
		}
		return reactGate.promise.then(() => {
			throw new Error('react exploded');
		});
	});

	const analysisPromise = getAiAnalysis(analyzedData, {
		apiKey: 'test',
		model,
	});
	await waitFor(() => calls.length === 2);
	reactGate.reject(new Error('react exploded'));

	await expect(analysisPromise).rejects.toThrow('AI analysis failed for artifact "react"');

	// The overview observed the abort and no further round started
	expect(overviewAborted).toBe(true);
	expect(getCall(calls, '# Results — d3')).toBeUndefined();
});

test('a schema-invalid response rejects the whole analysis', async () => {
	const { model, calls } = createMockModel(({ prompt }) => {
		if (prompt.includes('# Results — react')) {
			// Invalid JSON fails structured parsing; blank commentary is
			// rejected by the schema unit tests
			return 'not json';
		}
		if (prompt.includes('# Scoreboard summary')) {
			return JSON.stringify({
				intro: 'i',
				conclusion: 'c',
			});
		}
		return JSON.stringify({ commentary: 'valid' });
	});

	await expect(getAiAnalysis(analyzedData, {
		apiKey: 'test',
		model,
	})).rejects.toThrow('AI analysis failed for artifact "react"');

	// The failed round prevented later rounds from starting
	expect(getCall(calls, '# Results — d3')).toBeUndefined();
});

test('makes no model requests without credentials', async () => {
	const { model, calls } = createMockModel(() => JSON.stringify({ commentary: 'c' }));

	// An empty string is an explicit absent key that does not fall back to
	// the ambient environment
	const analysis = await getAiAnalysis(analyzedData, {
		apiKey: '',
		model,
	});

	expect(analysis).toBeUndefined();
	expect(calls).toHaveLength(0);
});
