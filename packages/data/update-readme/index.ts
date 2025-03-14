import fs from 'fs/promises';
import path from 'path';
import commentMark from 'comment-mark';
import outdent from 'outdent';
import { format } from 'date-fns';
import { markdownTable } from 'markdown-table';
import byteSize from 'byte-size';
import { minBy, capitalize } from 'lodash-es';
import type { BenchmarkResultSuccessWithRuns } from '@minification-benchmarks/bench/types.js';
import { minifiersDirectory } from '@minification-benchmarks/minifiers/utils/minifiers-directory.js';
import { getMinifiers } from '@minification-benchmarks/minifiers';
import { data } from '../data/index.js';
import type { Data, Artifact } from '../types.js';
import { percent, formatMs } from './formatting.js';
import * as mdu from './mdu.js';

byteSize.defaultOptions({ precision: 2 });

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
	artifact: Artifact,
) => {
	const minified = Object.entries(artifact.minified);
	const bestMinified = minBy(minified, '1.result.data.minifiedBytes')!;
	const bestMinzipped = minBy(minified, '1.result.data.minzippedBytes')!;
	const bestSpeed = minBy(minified, '1.result.data.time')!;

	return markdownTable(
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
			...minified.map(([minifierName, minifier], index) => {
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
							`❌ ${message === 'timeout' ? 'Timed out' : capitalize(message)}`,
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
							minifierName === bestMinified[0],
						),
						displayColumn(
							byteSize(result.data.minzippedBytes).toString(),
							percent(artifact.gzipSize, result.data.minzippedBytes),
							minifierName === bestMinzipped[0],
						),
						displayColumn(
							formatMs(result.data.time),
							compareSpeed(result, bestSpeed[1].result as BenchmarkResultSuccessWithRuns),
							minifierName === bestSpeed[0],
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
};

const generateMermaidGraph = (
	name: string,
	artifact: Artifact,
) => {
	const minifiers = Object.entries(artifact.minified)
		.map(([minifierName, { result }]) => {
			if ('error' in result) {
				return;
			}
			return [minifierName, result.data.minzippedBytes] as const;
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
			JSON.stringify([artifact.gzipSize, ...minifiers.map(([, size]) => size)])
		}
	`);
};

const generateBenchmarks = (benchmarkData: Data) => {
	const artifacts = Object.entries(benchmarkData);

	artifacts.sort(
		([, { size: sizeA }], [, { size: sizeB }]) => sizeA - sizeB,
	);

	return artifacts
		.map(
			([name, artifact]) => [
				generateMermaidGraph(name, artifact),
				mdu.div(generateBenchmarkTable(name, artifact), {
					align: 'center',
				}),
			].join('\n\n'),
		)
		.join('\n\n----\n\n');
};

const minifiers = await getMinifiers();

const readmePath = './README.md';
const readme = await fs.readFile(readmePath, 'utf8');

const newReadme = commentMark(readme, {
	lastUpdated: format(new Date(), 'MMM d, y'),
	benchmarks: generateBenchmarks(data),
	minifiers: minifiers.map(
		({ meta }) => `- ${mdu.link(meta.name, meta.url)} ${mdu.sub(`v${meta.version}`)}`,
	).join('\n'),
});

await fs.writeFile(readmePath, newReadme);
