import fs from 'fs/promises';
import commentMark from 'comment-mark';
import { format } from 'date-fns';
import { markdownTable } from 'markdown-table';
import byteSize from 'byte-size';
import { minBy } from 'lodash-es';
import type { BenchmarkResultSuccessWithRuns } from '@minification-benchmarks/bench/types.js';
import { data } from '../index.js';
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

	// Move this to save JSON (JSON should be sorted)
	minified.sort(([, a], [, b]) => {
		if ('error' in a.result) {
			return 1;
		}
		if ('error' in b.result) {
			return -1;
		}
		return a.result.data.minzippedSize - b.result.data.minzippedSize;
	});

	const bestMinified = minBy(minified, '1.result.data.minifiedSize')!;
	const bestMinzipped = minBy(minified, '1.result.data.minzippedSize')!;
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
			...minified.map(([minifierName, minifier]) => {
				const { result } = minifier;
				if ('error' in result) {
					return [
						minifierName,
						'-',
						'-',
						'-',
					];
				}

				return [
					minifierName,
					displayColumn(
						byteSize(result.data.minifiedSize).toString(),
						percent(artifact.size, result.data.minifiedSize),
						minifierName === bestMinified[0],
					),
					displayColumn(
						byteSize(result.data.minzippedSize).toString(),
						percent(artifact.gzipSize, result.data.minzippedSize),
						minifierName === bestMinzipped[0],
					),
					displayColumn(
						formatMs(result.data.time),
						compareSpeed(result, bestSpeed[1].result as BenchmarkResultSuccessWithRuns),
						minifierName === bestSpeed[0],
					),
				];
			}),
		],
		{
			align: ['l', 'r', 'r', 'r'],
		},
	);
};

const generateBenchmarks = (data: Data) => {
	const artifacts = Object.entries(data);

	artifacts.sort(
		([, { size: sizeA }], [, { size: sizeB }]) => sizeA - sizeB,
	);

	return artifacts
		.map(([name, artifact]) => generateBenchmarkTable(name, artifact))
		.join('\n----\n');
};

const readmePath = './README.md';
const readme = await fs.readFile(readmePath, 'utf8');

const newReadme = commentMark(readme, {
	lastUpdated: format(new Date(), 'MMM d, y'),
	benchmarks: generateBenchmarks(data),
});

await fs.writeFile(readmePath, newReadme);
