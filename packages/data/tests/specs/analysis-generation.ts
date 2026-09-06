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

type ModelHandler = (prompt: string, callIndex: number) => Promise<string> | string;

const createMockModel = (respond: ModelHandler) => {
	const prompts: string[] = [];
	const model: LanguageModelV3 = {
		specificationVersion: 'v3',
		provider: 'mock',
		modelId: 'mock-model',
		supportedUrls: {},
		doGenerate: async (options: LanguageModelV3CallOptions) => {
			const prompt = extractPromptText(options.prompt);
			prompts.push(prompt);
			return textResult(await respond(prompt, prompts.length - 1));
		},
		doStream: () => {
			throw new Error('doStream is not used by this workflow');
		},
	};
	return {
		model,
		prompts,
	};
};

const respondToPrompt = (prompt: string) => {
	if (prompt.includes('# Scoreboard summary')) {
		return JSON.stringify({
			intro: 'overview intro',
			conclusion: 'overview conclusion',
		});
	}
	return JSON.stringify({
		commentary: prompt.includes('# Results — react') ? 'react commentary' : 'd3 commentary',
	});
};

test('each model request contains only its own artifact', async () => {
	const { model, prompts } = createMockModel(respondToPrompt);

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

	// One commentary request per artifact, plus the overview
	expect(prompts).toHaveLength(3);

	// Artifact requests never see the other artifact's results
	const reactPrompt = prompts.find(prompt => prompt.includes('# Results — react'));
	expect(reactPrompt).toContain('minifiedBytes=20');
	expect(reactPrompt).not.toContain('d3');
});

test('commentary is associated with its artifact regardless of completion order', async () => {
	const { model, prompts } = createMockModel(async (prompt, callIndex) => {
		// Reverse the completion order on the second call
		await sleep(callIndex === 0 ? 30 : 1);
		return respondToPrompt(prompt);
	});

	const analysis = await getAiAnalysis(analyzedData, {
		apiKey: 'test',
		model,
	});

	expect(analysis?.rounds).toStrictEqual({
		react: 'react commentary',
		d3: 'd3 commentary',
	});
	expect(prompts).toHaveLength(3);
});

test('rejects the whole analysis when the overview fails', async () => {
	const { model, prompts } = createMockModel((prompt) => {
		if (prompt.includes('Scoreboard summary')) {
			throw new Error('overview exploded');
		}
		return JSON.stringify({ commentary: 'c' });
	});

	await expect(getAiAnalysis(analyzedData, {
		apiKey: 'test',
		model,
	}))
		.rejects.toThrow('AI analysis failed for the overview');

	// The failed overview aborts the shared signal; artifact calls stop
	expect(prompts.length).toBeLessThan(3);
});

test('makes no model requests without credentials', async () => {
	const { model, prompts } = createMockModel(respondToPrompt);

	const analysis = await getAiAnalysis(analyzedData, {
		apiKey: undefined,
		model,
	});

	expect(analysis).toBeUndefined();
	expect(prompts).toHaveLength(0);
});
