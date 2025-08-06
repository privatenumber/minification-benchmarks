import fs from 'fs/promises';
import path from 'path';
import { commentMark } from 'comment-mark';
import outdent from 'outdent';
import { format } from 'date-fns';
import { markdownTable } from 'markdown-table';
import { capitalize } from 'lodash-es';
import type { BenchmarkResultSuccessWithRuns } from '@minification-benchmarks/bench/types.js';
import { minifiersDirectory } from '@minification-benchmarks/minifiers/utils/minifiers-directory.js';
import { getMinifiers } from '@minification-benchmarks/minifiers';
import { byteSize } from '../utils/byte-size.js';
import type { Artifact } from '../types.js';
import { percent, formatMs } from './formatting.js';
import * as mdu from './mdu.js';
import { getAiAnalysis } from './ai-analysis/index.js';
import {
	getAnalyzedData, type AnalyzedData, type AnalyzedArtifact, type MinifierWithScore,
} from './analyzed-data.js';

const displayColumn = (
	text: string,
	annotation: string,
	isWinner: boolean,
) => {
	const columnText = (
		mdu.sup(`${isWinner ? '🏆' : ''}${annotation || ''} `)
		+ mdu.c(text)
	);

	return isWinner ? mdu.strong(columnText) : columnText;
};

const compareSpeed = (
	current: BenchmarkResultSuccessWithRuns,
	fastest?: BenchmarkResultSuccessWithRuns,
) => (
	(fastest === current)
		? ''
		: mdu.emphasize(
			`${Math.floor(current.data.time / fastest!.data.time)}x`,
		)
);

const generateBenchmarkTable = (
	artifactName: string,
	artifact: AnalyzedArtifact,
) => markdownTable(
	[
		['Artifact', 'Original size', 'Gzip size'],
		[
			`${mdu.link(
				`${artifactName} v${artifact.version}`,
				`https://www.npmjs.com/package/${artifactName}/v/${artifact.version}`,
			)} (${mdu.link('Source', `https://unpkg.com/${artifactName}@${artifact.version}${artifact.filePath}`)})`,
			mdu.c(byteSize(artifact.size).toString()),
			mdu.c(byteSize(artifact.gzipSize).toString()),
			'',
		],

		['Minifier', 'Minified size', 'Minzipped size', 'Time'].map(mdu.strong),
		...artifact.minifiedWithScores.map(({ minifierName, minifier }, index) => {
			const { result } = minifier;

			const columns = [
				`${(index + 1).toString()}. ${mdu.link(
					minifierName,
					path.relative(process.cwd(), path.join(minifiersDirectory, minifier.minifierPath)),
				)}`,
			];

			if ('error' in result) {
				const message = result.error.stage || result.error.message;
				columns[0] += ` ${
					mdu.sub(
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
					columns.push('-', '-', `${mdu.sup(':warning:')} ${mdu.c('+10,000 ms')}`);
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
		align: ['l', 'r', 'r', 'r'],
	},
);

const generateMermaidGraph = (
	name: string,
	artifact: Artifact,
	minifiedWithScores: MinifierWithScore[],
) => {
	const minifiers = minifiedWithScores
		.map(({ minifier }) => {
			const { result } = minifier;
			if ('error' in result) {
				return;
			}
			return result.data.minzippedBytes;
		})
		.filter(Boolean);

	return mdu.mermaid(outdent`
	---
	config:
	    xyChart:
	        width: 720
	        height: 360
	        xAxis:
	            labelPadding: 20
	        yAxis:
	            labelPadding: 10
	---
	xychart-beta
		title ${JSON.stringify(`${name} v${artifact.version}`)}
		x-axis ${
			JSON.stringify(['Original', ...minifiers.map((_, index) => index + 1)])
		}
		y-axis "Gzip size" 0 --> ${artifact.gzipSize}
		bar ${
			JSON.stringify([artifact.gzipSize, ...minifiers])
		}
	`);
};

const generateBenchmarks = (
	analyzedData: AnalyzedData,
) => analyzedData
	.map(
		([name, artifact]) => [
			generateMermaidGraph(name, artifact, artifact.minifiedWithScores),
			mdu.div(
				generateBenchmarkTable(name, artifact),
				{ align: 'center' },
			),
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

const minifiersList = markdownTable([
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
				mdu.link(meta.name, meta.url),
				meta.registry === 'npm'
					? mdu.link(meta.version, `https://www.npmjs.com/package/${meta.name}/v/${meta.version}`)
					: meta.version,
				meta.publishDate
					? format(meta.publishDate, 'yyyy-MM-dd')
					: '',
			],
		),
]);

const utcToday = new Date(new Date().toISOString().split('T')[0]);

const newReadme = commentMark(readme, {
	lastUpdated: format(utcToday, 'MMM d, y'),
	benchmarks: generateBenchmarks(analyzedData),
	minifiers: minifiersList,
	aiSystemPrompt: ai?.systemPrompt,
	aiAnalysis: ai?.analysis,
});

await fs.writeFile(readmePath, newReadme);
