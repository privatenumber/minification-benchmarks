import fs from 'fs/promises';
import path from 'path';
import { outdent } from 'outdent';
import { commentMark } from 'comment-mark';
import { format } from 'date-fns';
import { capitalize } from 'lodash-es';
import type { BenchmarkResultSuccessWithRuns } from '@minification-benchmarks/bench/types.ts';
import { minifiersDirectory } from '@minification-benchmarks/minifiers/utils/minifiers-directory.ts';
import { getMinifiers } from '@minification-benchmarks/minifiers';
import md from 'md-pen';
import { byteSize } from '../utils/byte-size.ts';
import { percent, formatMs } from './formatting.ts';
import { getAiAnalysis } from './ai-analysis/index.ts';
import {
	getAnalyzedData, type AnalyzedData, type AnalyzedArtifact,
} from './analyzed-data.ts';
import { getBarChartUrl } from './bar-chart.ts';

const displayColumn = (
	text: string,
	annotation: string,
	isWinner: boolean,
) => {
	const columnText = (
		md.sup(`${isWinner ? '🏆' : ''}${annotation || ''} `)
		+ md.code(text)
	);

	return isWinner ? md.bold(columnText) : columnText;
};

const compareSpeed = (
	current: BenchmarkResultSuccessWithRuns,
	fastest?: BenchmarkResultSuccessWithRuns,
) => (
	(fastest === current)
		? ''
		: md.italic(
			`${Math.floor(current.data.time / fastest!.data.time)}x`,
		)
);

const generateBenchmarkTable = (
	artifactName: string,
	artifact: AnalyzedArtifact,
) => md.table(
	[
		['Artifact', 'Original size', 'Gzip size'],
		[
			`${md.link(
				`https://www.npmjs.com/package/${artifactName}/v/${artifact.version}`,
				`${artifactName} v${artifact.version}`,
			)} (${md.link(`https://unpkg.com/${artifactName}@${artifact.version}${artifact.filePath}`, 'Source')})`,
			md.code(byteSize(artifact.size).toString()),
			md.code(byteSize(artifact.gzipSize).toString()),
			'',
		],

		['Minifier', 'Minified size', 'Minzipped size', 'Time'].map(md.bold),
		...artifact.minifiedWithScores.map(({ minifierName, minifier }, index) => {
			const { result } = minifier;

			const columns = [
				`${(index + 1).toString()}. ${md.link(
					path.relative(process.cwd(), path.join(minifiersDirectory, minifier.minifierPath)),
					minifierName,
				)}`,
			];

			if ('error' in result) {
				const message = result.error.stage || result.error.message;
				columns[0] += ` ${
					md.sub(
						`❌ ${
							message === 'timeout'
								? 'Timed out'
								: capitalize(message.split('\n')[0].slice(0, 15))
						}`,
						{
							title: `Failed: ${message}`,
						},
					)
				}`;

				if (message === 'timeout') {
					columns.push('-', '-', `${md.sup(':warning:')} ${md.code('+10,000 ms')}`);
				} else {
					columns.push('❌', '❌ ', '-');
				}
			} else {
				columns.push(
					displayColumn(
						byteSize(result.data.minifiedBytes).toString(),
						percent(artifact.size, result.data.minifiedBytes),
						minifierName === artifact.bestMinified?.[0],
					),
					displayColumn(
						byteSize(result.data.minzippedBytes).toString(),
						percent(artifact.gzipSize, result.data.minzippedBytes),
						minifierName === artifact.bestMinzipped?.[0],
					),
					displayColumn(
						formatMs(result.data.time),
						compareSpeed(result, artifact.bestSpeed?.[1].result as BenchmarkResultSuccessWithRuns),
						minifierName === artifact.bestSpeed?.[0],
					),
				);
			}

			return columns;
		}),
	],
	{
		align: ['left', 'right', 'right', 'right'],
	},
);

const generateBenchmarks = (
	analyzedData: AnalyzedData,
) => analyzedData
	.map(
		([name, artifact]) => [
			outdent`
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset="${getBarChartUrl(name, artifact, artifact.minifiedWithScores, true)}">
				<img src="${getBarChartUrl(name, artifact, artifact.minifiedWithScores)}">
			</picture>
			`,
			md.el('div', { align: 'center' }, `\n\n${generateBenchmarkTable(name, artifact)}\n`),
		].join('\n\n'),
	)
	.join('\n\n----\n\n');

const minifiers = await getMinifiers();

const analyzedData = getAnalyzedData();
const ai = await getAiAnalysis(
	minifiers,
	analyzedData,
);

const readmePath = './README.md';
const readme = await fs.readFile(readmePath, 'utf8');

const minifiersList = md.table([
	['Minifier', 'Version', 'Release date ↓'],
	...minifiers
		// Sort by release date
		.sort(
			(a, b) => {
				const dateA = a.meta.publishDate ? a.meta.publishDate.getTime() : 0;
				const dateB = b.meta.publishDate ? b.meta.publishDate.getTime() : 0;
				return dateB - dateA;
			},
		)
		.map(
			({ meta }) => [
				md.link(meta.url, meta.name),
				meta.registry === 'npm'
					? md.link(`https://www.npmjs.com/package/${meta.name}/v/${meta.version}`, meta.version)
					: meta.version,
				meta.publishDate
					? format(meta.publishDate, 'yyyy-MM-dd')
					: '',
			],
		),
]);

const utcToday = new Date(new Date().toISOString().split('T')[0]);
const escapeHtml = (string_ = '') => string_
	.replaceAll('&', '&amp;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;')
	.replaceAll('"', '&quot;')
	.replaceAll('\'', '&#39;');

const newReadme = commentMark(readme, {
	lastUpdated: format(utcToday, 'MMM d, y'),
	benchmarks: generateBenchmarks(analyzedData),
	minifiers: minifiersList,
	aiSystemPrompt: escapeHtml(ai?.systemPrompt),
	aiAnalysis: ai?.analysis,
});

await fs.writeFile(readmePath, newReadme);
