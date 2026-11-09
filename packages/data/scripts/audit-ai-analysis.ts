import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { generateText } from 'ai';
import { getMinifiers, type MinifierLoaded } from '@minification-benchmarks/minifiers';
import { getAnalyzedData, getChampion } from '../update-readme/analyzed-data.ts';
import { createAnalysisProvider, getAnalysisPrompt } from '../update-readme/ai-analysis/index.ts';

const { values } = parseArgs({
	options: {
		models: {
			type: 'string',
			default: 'glm-5.3,glm-5.3-flash,kimi-k3.1-pro,qwen3.8-max,claude-haiku-5-5,gpt-6-luna',
		},
		variants: {
			type: 'string',
			default: 'current,baseline',
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

const models = values.models.split(',');
const variants = values.variants.split(',');
const temperatures = values.temperatures.split(',');
const runs = Number(values.runs);
if (!Number.isSafeInteger(runs) || runs < 1 || !models.every(m => /^[\w.-]+$/.test(m))
	|| new Set(models).size !== models.length
	|| !variants.every(v => ['current', 'baseline'].includes(v)) || new Set(variants).size !== variants.length
	|| !temperatures.every(t => ['default', '0'].includes(t)) || new Set(temperatures).size !== temperatures.length) {
	throw new Error('Invalid models, variants, temperatures, or runs');
}
if (!values['dry-run'] && !values.reanalyze && !process.env.OPENCODE_GO_API_KEY) {
	throw new Error('OPENCODE_GO_API_KEY is required unless --dry-run is set');
}

const analyzedData = getAnalyzedData();
const champion = getChampion(analyzedData).champion?.name;
const names = [...new Set(analyzedData.flatMap(([, artifact]) => Object.keys(artifact.minified)))];
const sortedNames = names.slice().sort((a, b) => b.length - a.length);
const baselineReadme = execFileSync('git', ['show', 'd489b93:README.md'], {
	encoding: 'utf8',
	maxBuffer: 10_000_000,
});
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
const current = await getAnalysisPrompt(values['dry-run'] ? baselineMinifiers : await getMinifiers(), analyzedData);
const baselineData = execFileSync('git', ['show', 'd489b93:packages/data/data/data.json'], { maxBuffer: 10_000_000 });
const sameData = baselineData.equals(await fs.readFile('packages/data/data/data.json'));
const prompts: Record<string, typeof baseline> = {
	current,
	baseline,
};
const outputDirectory = values.reanalyze ?? path.join('results', 'ai-audit', new Date().toISOString().replaceAll(':', '-'));
await fs.mkdir(outputDirectory).catch(async (error: NodeJS.ErrnoException) => {
	if (values.reanalyze && error.code === 'EEXIST') { return; }
	if (error.code !== 'ENOENT') { throw error; }
	await fs.mkdir(path.dirname(outputDirectory), { recursive: true });
	await fs.mkdir(outputDirectory);
});
await fs.writeFile(path.join(outputDirectory, values.reanalyze ? 'inputs-reanalyze.json' : 'inputs.json'), `${JSON.stringify({
	prompts,
	sameData,
	champion,
	models,
	variants,
	temperatures,
	runs,
	dryRun: values['dry-run'],
	minifierMetadata: values['dry-run'] ? 'historical baseline' : 'installed minifiers and npm registry',
}, null, '\t')}\n`);
if (!sameData && variants.includes('baseline')) { console.warn('Baseline data differs from current data; prompt variants do not use the same measurements.'); }

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
const numbers = (text: string) => [...text.matchAll(/\b(\d[\d,]*(?:\.\d+)?)\s*(KB|MB|ms|%)/gi)]
	.map(match => ({
		text: match[0],
		value: Number(match[1].replaceAll(',', '')),
		precision: (match[1].split('.')[1] ?? '').length,
		unit: match[2].toLowerCase(),
	}));
const headings = ['Best minifier', 'Honorable mentions', 'Eliminated', 'Closing remarks'];
const analyze = (text: string, prompt: string, instructions: string, variant: string) => {
	const champions = mentions(section(text, 'Best minifier'));
	const inputNumbers = numbers(`${instructions}\n${prompt}`);
	const expectedEliminations = mentions(section(prompt, 'Eliminated'));
	const actualEliminations = mentions(section(text, 'Eliminated'));
	const unknownNames = [...new Set(text.match(/(?<![\w@/.-])(?:@[\w.-]+\/[\w.-]+|[\w.-]+\/[\w.-]+|[\w.-]*minify[\w.-]*)(?![\w/.-])/gi)?.map(name => name.replace(/\.+$/, '')))]
		.filter(name => !names.some(known => known.toLowerCase() === name.toLowerCase()));
	return {
		champion: champions[0] ?? null,
		championCandidates: champions,
		championMatches: variant === 'current' ? champions[0] === champion : null,
		missingHeadings: headings.filter(heading => !new RegExp(String.raw`^#{1,6}\s+${heading}\s*$`, 'im').test(text)),
		unknownNames,
		unmatchedNumbers: numbers(text).filter(number => !inputNumbers.some(input => (
			input.unit === number.unit
			&& (number.precision > 100
				? input.value === number.value
				: Number(input.value.toFixed(number.precision)) === number.value)
		))).map(number => number.text),
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
		try {
			const saved = values.reanalyze
				? JSON.parse(await fs.readFile(path.join(outputDirectory, `${prefix}.json`), 'utf8')) as Result
				: undefined;
			if (saved?.error) {
				throw new Error(saved.error);
			}
			const response = await getResponse(job, prefix, saved);
			text = response.text;
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
		}
		await Promise.all([
			fs.writeFile(path.join(outputDirectory, `${prefix}.txt`), text),
			fs.writeFile(path.join(outputDirectory, `${prefix}.json`), `${JSON.stringify(result, null, '\t')}\n`),
		]);
		results.push(result);
		active.set(job.model, active.get(job.model)! - 1);
	}
};
await Promise.all(Array.from({ length: 6 }, worker));

const summary = ['# AI analysis audit', '', `Baseline data matches current data: ${sameData}`, '', '| Variant | Model | Temperature | OK/failed | Champions | Champion matches | Structure | Mean unmatched numbers | Elimination mismatches | Median latency | Mean words |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |'];
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
