import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { generateText } from 'ai';
import spawn from 'nano-spawn';
import { getMinifiers, type MinifierLoaded } from '@minification-benchmarks/minifiers';
import { getAnalyzedData, getChampion } from '../update-readme/analyzed-data.ts';
import { createAnalysisProvider, getAnalysisPrompt } from '../update-readme/ai-analysis/index.ts';

const { values } = parseArgs({
	options: {
		// No default: every live run spends the shared Go allowance that CI also uses
		models: {
			type: 'string',
		},
		yes: {
			type: 'boolean',
			default: false,
		},
		variants: {
			type: 'string',
			// `baseline` replays the Oct 10, 2026 prompt and only runs while data.json still matches it
			default: 'current',
		},
		temperatures: {
			type: 'string',
			default: 'default,0',
		},
		runs: {
			type: 'string',
			default: '5',
		},
		'dry-run': {
			type: 'boolean',
			default: false,
		},
		// Re-score the saved outputs in an earlier results directory without calling any model
		reanalyze: {
			type: 'string',
		},
	},
});

type SavedInputs = {
	models: string[];
	variants: string[];
	temperatures: string[];
	runs: number;
	champion: string | null;
	names?: string[];
	prompts: Record<string, { instructions: string;
		prompt: string; }>;
	sameData: boolean;
};
const savedInputs = values.reanalyze
	? JSON.parse(await fs.readFile(path.join(values.reanalyze, 'inputs.json'), 'utf8')) as SavedInputs
	: undefined;
if (values.reanalyze && (!savedInputs || !Array.isArray(savedInputs.models)
	|| !Array.isArray(savedInputs.variants) || !Array.isArray(savedInputs.temperatures)
	|| !Number.isSafeInteger(savedInputs.runs) || typeof savedInputs.sameData !== 'boolean'
	|| !Object.hasOwn(savedInputs, 'champion') || (savedInputs.names && !Array.isArray(savedInputs.names)))) {
	throw new Error('Saved inputs are missing the job matrix, champion, or data comparison');
}
const live = !values['dry-run'] && !values.reanalyze;
if (live && !values.models) {
	throw new Error('Pass --models explicitly, e.g. --models glm-5.3-flash. Live runs spend the Go allowance CI uses; see notes/minification-benchmarks/ai-analysis.md#usage-limits');
}
const models: string[] = savedInputs?.models ?? (values.models ?? 'glm-5.3').split(',');
const variants: string[] = savedInputs?.variants ?? values.variants.split(',');
const temperatures: string[] = savedInputs?.temperatures ?? values.temperatures.split(',');
const runs: number = savedInputs?.runs ?? Number(values.runs);
if (!Number.isSafeInteger(runs) || runs < 1 || !models.every(m => /^[\w.-]+$/.test(m))
	|| new Set(models).size !== models.length
	|| !variants.every(v => ['current', 'baseline'].includes(v)) || new Set(variants).size !== variants.length
	|| !temperatures.every(t => ['default', '0'].includes(t)) || new Set(temperatures).size !== temperatures.length) {
	throw new Error('Invalid models, variants, temperatures, or runs');
}
const requestCount = models.length * variants.length * temperatures.length * runs;
if (live) {
	console.log(`This audit sends ${requestCount} model requests.`);
	// A 120-request audit used up a whole 5-hour Go window and blocked CI's README job
	if (requestCount > 20 && !values.yes) {
		throw new Error(`Refusing to send ${requestCount} requests without --yes`);
	}
}
if (live && !process.env.OPENCODE_GO_API_KEY) {
	throw new Error('OPENCODE_GO_API_KEY is required unless --dry-run is set');
}

const analyzedData = values.reanalyze ? undefined : getAnalyzedData();
const champion: string | undefined = savedInputs
	? savedInputs.champion ?? undefined
	: getChampion(analyzedData!).champion?.name;
let names: string[] = savedInputs?.names ?? [];
let namesDerived = false;
let prompts: Record<string, { instructions: string;
	prompt: string; }>;
let sameData: boolean;
if (savedInputs) {
	prompts = savedInputs.prompts;
	sameData = savedInputs.sameData;
	if (!prompts || !variants.every(variant => typeof prompts[variant]?.prompt === 'string'
		&& typeof prompts[variant]?.instructions === 'string')) {
		throw new Error('Saved inputs are missing prompts');
	}
	if (!savedInputs.names) {
		const text = Object.values(prompts).map(item => item.prompt).join('\n');
		names = [...new Set([
			...[...text.matchAll(/^- (.+) v\S+/gm)].map(match => match[1]),
			...[...text.matchAll(/^- (?:Best gzip compression|Fastest|Most balanced|Honorable mention): (.+?):/gm)].map(match => match[1]),
		])];
		namesDerived = true;
	}
} else {
	names = [...new Set(analyzedData!.flatMap(([, artifact]) => Object.keys(artifact.minified)))];
	const { stdout: baselineReadme } = await spawn('git', ['show', 'd489b93:README.md']);
	const region = baselineReadme.match(/<!-- aiSystemPrompt:start -->([\s\S]*?)<!-- aiSystemPrompt:end -->/)?.[1];
	if (!region) { throw new Error('Baseline aiSystemPrompt region not found'); }
	const entities: Record<string, string> = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'",
	};
	const baselineText = region.replaceAll(/&(?:amp|lt|gt|quot);|&#39;/g, entity => entities[entity]);
	const messageStart = baselineText.search(/^# Minifiers\s*$/m);
	if (messageStart < 0) { throw new Error('Baseline message not found'); }
	const baseline = {
		instructions: baselineText.slice(0, messageStart).trim(),
		prompt: baselineText.slice(messageStart).trim(),
	};
	// The published baseline contains minifier metadata, so dry runs need no npm requests.
	const baselineMinifiers = baseline.prompt.split('\n').flatMap((line) => {
		const match = line.match(/^- (.+) v([^ ]+)(?: released (\d{4}-\d{2}-\d{2}))?$/);
		return match
			? [{
				name: match[1],
				meta: {
					version: match[2],
					publishDate: match[3] ? new Date(`${match[3]}T12:00:00`) : undefined,
				},
			}]
			: [];
	}) as MinifierLoaded[];
	const current = await getAnalysisPrompt(values['dry-run'] ? baselineMinifiers : await getMinifiers(), analyzedData!);
	const { stdout: baselineData } = await spawn('git', ['show', 'd489b93:packages/data/data/data.json']);
	// nano-spawn strips the final newline that data.json ends with
	sameData = `${baselineData}\n` === await fs.readFile('packages/data/data/data.json', 'utf8');
	prompts = {
		current,
		baseline,
	};
}
if (!sameData && variants.includes('baseline')) {
	throw new Error('Baseline data differs from current data; prompt variants use different measurements');
}
const sortedNames = names.slice().sort((a, b) => b.length - a.length);
const outputDirectory = values.reanalyze ?? path.join('results', 'ai-audit', new Date().toISOString().replaceAll(':', '-'));
if (!values.reanalyze) {
	await fs.mkdir(outputDirectory).catch(async (error: NodeJS.ErrnoException) => {
		if (values.reanalyze && error.code === 'EEXIST') { return; }
		if (error.code !== 'ENOENT') { throw error; }
		await fs.mkdir(path.dirname(outputDirectory), { recursive: true });
		await fs.mkdir(outputDirectory);
	});
	await fs.writeFile(path.join(outputDirectory, 'inputs.json'), `${JSON.stringify({
		prompts,
		sameData,
		champion: champion ?? null,
		names,
		models,
		variants,
		temperatures,
		runs,
		dryRun: values['dry-run'],
		minifierMetadata: values['dry-run'] ? 'historical baseline' : 'installed minifiers and npm registry',
	}, null, '\t')}\n`);
}

const section = (text: string, heading: string) => {
	const escaped = heading.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
	const match = new RegExp(String.raw`^(#{1,6})[ \t]+${escaped}[ \t]*$`, 'im').exec(text);
	if (!match) {
		return '';
	}
	const content = text.slice(match.index + match[0].length);
	const next = new RegExp(String.raw`^#{1,${match[1].length}}[ \t]+`, 'm').exec(content);
	return next ? content.slice(0, next.index) : content;
};
const findChampionInAnalysis = (text: string, names_: string[]) => {
	const heading = /^#{1,6}[ \t]+Best minifier(?:[ \t]*:(.*)|[ \t]*)$/im.exec(text);
	if (!heading) { return undefined; }
	const body = text.slice(heading.index + heading[0].length).split(/^#{1,6}[ \t]+/m)[0];
	const find = (content: string) => {
		const matches = names_.flatMap((name) => {
			const escaped = name.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
			const match = new RegExp(String.raw`(?<![\w@/.-])${escaped}(?![\w/-]|\.[\w/-])`, 'i').exec(content);
			return match
				? [{
					name,
					index: match.index,
				}]
				: [];
		});
		return matches.sort((a, b) => a.index - b.index || b.name.length - a.name.length)[0]?.name;
	};
	const inHeading = find(heading[1] ?? '');
	if (inHeading) { return inHeading; }
	for (const sentence of body.split(/(?<=[.!?])\s+|\n+/)) {
		const decisive = /\b(?:crown goes to|crowning)\b/i.exec(sentence);
		if (decisive) {
			const winner = find(sentence.slice(decisive.index + decisive[0].length));
			if (winner) { return winner; }
		}
	}
	for (const paragraph of body.trim().split(/\n\s*\n/)) {
		for (const sentence of paragraph.split(/(?<=[.!?])\s+|\n+/)) {
			if (/\b(?:crown(?:ing|ed)?|champion|winner|goes to|takes)\b/i.test(sentence)) {
				const winner = find(sentence);
				if (winner) { return winner; }
			}
		}
		const first = find(paragraph);
		if (first) { return first; }
	}
	return undefined;
};
const mentions = (text: string) => {
	let remaining = text;
	const found: {
		name: string;
		index: number;
	}[] = [];
	for (const name of sortedNames) {
		const escaped = name.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
		// A trailing period ends a sentence ("... is @swc/core."), not the name
		const pattern = new RegExp(String.raw`(?<![\w@/.-])${escaped}(?![\w/-]|\.[\w/-])`, 'gi');
		const match = pattern.exec(remaining);
		if (match) {
			found.push({
				name,
				index: match.index,
			});
			remaining = remaining.replaceAll(pattern, match_ => ' '.repeat(match_.length));
		}
	}
	return found.sort((a, b) => a.index - b.index).map(item => item.name);
};
const numbers = (text: string) => [...text.matchAll(/\b(\d[\d,]*(?:\.\d+)?)\s*(kilobytes?|megabytes?|milliseconds?|seconds?|percent|KB|MB|ms|sec|s|%)(?![a-z])/gi)]
	.map(match => ({
		text: match[0],
		value: Number(match[1].replaceAll(',', '')),
		precision: (match[1].split('.')[1] ?? '').length,
		unit: ({
			kilobyte: 'kb',
			kilobytes: 'kb',
			megabyte: 'mb',
			megabytes: 'mb',
			millisecond: 'ms',
			milliseconds: 'ms',
			second: 's',
			seconds: 's',
			sec: 's',
			percent: '%',
		} as Record<string, string>)[match[2].toLowerCase()] ?? match[2].toLowerCase(),
	}));
const headings = ['Best minifier', 'Honorable mentions', 'Eliminated', 'Closing remarks'];
const analyze = (text: string, prompt: string, instructions: string, variant: string) => {
	const namedChampion = findChampionInAnalysis(text, names);
	const inputNumbers = numbers(`${instructions}\n${prompt}`);
	const expectedEliminations = mentions(section(prompt, 'Eliminated'));
	const actualEliminations = mentions(section(text, 'Eliminated'));
	const unknownNames = [...new Set(text.match(/(?<![\w@/.-])(?:@[\w.-]+\/[\w.-]+|[\w.-]+-minify|minify-[\w.-]+)(?![\w/.-])/gi)?.map(name => name.replace(/\.+$/, '')))]
		.filter(name => !names.some(known => known.toLowerCase() === name.toLowerCase()));
	return {
		champion: namedChampion ?? null,
		championMatches: variant === 'current' ? namedChampion === champion : null,
		missingHeadings: headings.filter(heading => !new RegExp(String.raw`^#{1,6}\s+${heading}(?:\s*:.*)?\s*$`, 'im').test(text)),
		unknownNames,
		unmatchedNumbers: numbers(text).filter(number => !inputNumbers.some((input) => {
			if (input.unit !== number.unit && !(input.unit === 'ms' && number.unit === 's')) {
				return false;
			}
			const value = input.unit === 'ms' && number.unit === 's' ? input.value / 1000 : input.value;
			return number.precision > 100
				? value === number.value
				: Number(value.toFixed(number.precision)) === number.value;
		})).map(number => number.text),
		eliminations: {
			missing: expectedEliminations.filter(name => !actualEliminations.includes(name)),
			extra: actualEliminations.filter(name => !expectedEliminations.includes(name)),
		},
		words: text.trim().split(/\s+/).filter(Boolean).length,
	};
};

type Job = { model: string;
	variant: string;
	temperature: string;
	run: number; };
type Result = Job & { latencyMs: number;
	error?: string;
	usage?: unknown;
	checks?: ReturnType<typeof analyze>; };
const jobs: Job[] = models.flatMap(model => variants.flatMap(variant => (
	temperatures.flatMap(temperature => (
		Array.from({ length: runs }, (_, index) => ({
			model,
			variant,
			temperature,
			run: index + 1,
		}))
	))
)));
const results: Result[] = [];
const active = new Map<string, number>();
const fakeResponse = `### Best minifier\n${champion ?? '@swc/core'} leads in 30.86 KB, 825 KB, 1% and 999 ms.\n\n### Honorable mentions\nother-minify competes.\n\n### Eliminated\nNone.\n\n### Closing remarks\nCompare the trade-offs.`;
const getResponse = async (job: Job, prefix: string, saved: Result | undefined) => {
	if (saved) {
		return {
			text: await fs.readFile(path.join(outputDirectory, `${prefix}.txt`), 'utf8'),
			usage: saved.usage,
		};
	}
	if (values['dry-run']) {
		return {
			text: fakeResponse,
			usage: null,
		};
	}
	return generateText({
		model: createAnalysisProvider(`ai-audit-${job.variant}-${job.model}`).chatModel(job.model),
		...prompts[job.variant],
		...(job.temperature === '0' ? { temperature: 0 } : {}),
	});
};
const worker = async () => {
	for (;;) {
		const index = jobs.findIndex(job => (active.get(job.model) ?? 0) < 2);
		if (index === -1) { return; }
		const [job] = jobs.splice(index, 1);
		active.set(job.model, (active.get(job.model) ?? 0) + 1);
		const started = performance.now();
		const prefix = `${job.variant}--${job.model}--${job.temperature}--${job.run}`;
		let text = '';
		let result: Result;
		let validSaved = false;
		try {
			const saved = values.reanalyze
				? JSON.parse(await fs.readFile(path.join(outputDirectory, `${prefix}.json`), 'utf8')) as Result
				: undefined;
			if (saved && (typeof saved !== 'object' || saved.model !== job.model || saved.variant !== job.variant
				|| saved.temperature !== job.temperature || saved.run !== job.run || typeof saved.latencyMs !== 'number'
				|| (saved.error !== undefined && typeof saved.error !== 'string')
				|| (!saved.error && (!saved.checks || typeof saved.checks !== 'object')))) {
				throw new Error(`Malformed saved result: ${prefix}.json`);
			}
			if (values.reanalyze && !saved) {
				throw new Error(`Malformed saved result: ${prefix}.json`);
			}
			if (saved?.error) {
				throw new Error(saved.error);
			}
			const response = await getResponse(job, prefix, saved);
			text = response.text;
			validSaved = Boolean(saved);
			result = {
				...job,
				latencyMs: saved?.latencyMs ?? performance.now() - started,
				usage: response.usage,
				checks: analyze(
					text, prompts[job.variant].prompt, prompts[job.variant].instructions, job.variant,
				),
			};
		} catch (error) {
			result = {
				...job,
				latencyMs: performance.now() - started,
				error: error instanceof Error ? error.message : String(error),
			};
			if (values.reanalyze) {
				console.warn(`${prefix}: ${result.error}`);
			}
		}
		if (!values.reanalyze) {
			await fs.writeFile(path.join(outputDirectory, `${prefix}.txt`), text);
		}
		if (!values.reanalyze || validSaved) {
			await fs.writeFile(path.join(outputDirectory, `${prefix}.json`), `${JSON.stringify(result, null, '\t')}\n`);
		}
		results.push(result);
		active.set(job.model, active.get(job.model)! - 1);
	}
};
await Promise.all(Array.from({ length: 6 }, worker));

const summary = ['# AI analysis audit', '', `Baseline data matches current data: ${sameData}`, ...(namesDerived ? ['', 'Minifier names derived from saved prompts.'] : []), '', '| Variant | Model | Temperature | OK/failed | Champions | Champion matches | Structure | Mean unmatched numbers | Elimination mismatches | Median latency | Mean words |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |'];
for (const variant of variants) {
	for (const model of models) {
		for (const temperature of temperatures) {
			const group = results.filter(result => (
				result.variant === variant && result.model === model && result.temperature === temperature
			));
			const ok = group.filter(result => result.checks);
			const distribution = new Map<string, number>();
			for (const result of ok) {
				const name = result.checks!.champion ?? 'not found';
				distribution.set(name, (distribution.get(name) ?? 0) + 1);
			}
			const mean = (values_: number[]) => (values_.length > 0 ? (values_.reduce((a, b) => a + b, 0) / values_.length).toFixed(1) : '-');
			const latencies = ok.map(result => result.latencyMs).sort((a, b) => a - b);
			const median = latencies.length > 0 ? ((latencies[Math.floor((latencies.length - 1) / 2)] + latencies[Math.floor(latencies.length / 2)]) / 2).toFixed(1) : '-';
			const mismatchCount = ok.filter(result => (
				result.checks!.eliminations.missing.length > 0
				|| result.checks!.eliminations.extra.length > 0
			)).length;
			const matches = variant === 'current' ? `${ok.filter(result => result.checks!.championMatches).length}/${ok.length}` : 'n/a';
			summary.push(`| ${variant} | ${model} | ${temperature} | ${ok.length}/${group.length - ok.length} | ${[...distribution].map(([name, count]) => `${name} ${count}`).join(', ') || '-'} | ${matches} | ${ok.filter(result => result.checks!.missingHeadings.length === 0).length}/${ok.length} | ${mean(ok.map(result => result.checks!.unmatchedNumbers.length))} | ${mismatchCount}/${ok.length} | ${median} ms | ${mean(ok.map(result => result.checks!.words))} |`);
		}
	}
}
const report = `${summary.join('\n')}\n`;
await fs.writeFile(path.join(outputDirectory, 'summary.md'), report);
console.log(report);
console.log(`Results: ${outputDirectory}`);
