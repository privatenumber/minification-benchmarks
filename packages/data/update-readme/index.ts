import fs from 'fs/promises';
import commentMark from 'comment-mark';
import { format } from 'date-fns';
import { markdownTable } from 'markdown-table';
import * as mdu from './mdu.js';
// import path from 'path';
// import outdent from 'outdent';
import byteSize from 'byte-size';
import { minBy } from 'lodash-es';

// import { minBy } from 'lodash-es';
// import * as mdu from '@minification-benchmarks/utils/mdu';
import { percent, formatMs } from './formatting.js';
import { data } from '../index.js';
import type { Data, Artifact } from '../types.js';

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


const generateBenchmarkTable = (
	artifactName: string,
	artifact: Artifact,
) => {
	const minified = Object.entries(artifact.minified);
	
	minified.sort(([, a], [, b]) => {
		if ('error' in a.result) {
			return 1;
		}
		if ('error' in b.result) {
			return -1;
		}
		return a.result.data.minzippedSize - b.result.data.minzippedSize;
	});

	// const bestMinified = minBy(minified, 'data.raw.minifiedSize');
	// const bestMinzipped = minBy(successfulMinifiers, 'data.raw.minzippedSize');
	// const bestSpeed = minBy(successfulMinifiers, 'data.raw.averageTime');

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
				console.dir({
					minifierName,
					minifier,
				}, { colors: true, depth: null, maxArrayLength: null });

				const { result } = minifier;
				if ('error' in result) {
					return [
						minifierName,
						'-',
						'-',
						'-',
					];
				}
				// return [
				// 	'a',
				// 	'b',
				// 	'c',
				// 	'd',
				// ];

				return [
					minifierName,

					displayColumn(
						byteSize(result.data.minifiedSize).toString(),
						percent(artifact.size, result.data.minifiedSize),
						false,
						// minifier === bestMinified,
					),
					displayColumn(
						byteSize(result.data.minzippedSize).toString(),
						percent(artifact.gzipSize, result.data.minzippedSize),
						// minifier === bestMinzipped,
						false,
					),
					displayColumn(
						formatMs(result.data.time),
						'',
						false,
						// compareSpeed(minifier, bestSpeed),
						// minifier === bestSpeed,
					),

					// minifier.result.minifiedSize,
					// minifier.result.minzippedSize,
					// minifier.result.time,
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
	artifacts.sort(([, { size: sizeA }], [, { size: sizeB }]) => sizeA - sizeB);



	return artifacts.map(([name, artifact]) => {

		console.log(artifact);

		return generateBenchmarkTable(name, artifact);

	}).join('\n----\n');

};


const updateReadme = async (
	benchmarks: string,
) => {
	const readmePath = './README.md';
	const readme = await fs.readFile(readmePath, 'utf8');
	const newReadme = commentMark(readme, {
		lastUpdated: format(new Date(), 'MMM d, y'),
		// benchmarks,
	});
	await fs.writeFile(readmePath, newReadme);	
};


const asdf = generateBenchmarks(data);

console.log(asdf);
// console.dir(asdf, { colors: true, depth: null, maxArrayLength: null });

// await updateReadme(asdf);
