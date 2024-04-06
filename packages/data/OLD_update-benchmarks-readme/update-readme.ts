import path from 'path';
import fs from 'fs/promises';
import { markdownTable } from 'markdown-table';
import outdent from 'outdent';
import commentMark from 'comment-mark';
import byteSize from 'byte-size';
import { minBy } from 'lodash-es';
import { format } from 'date-fns';
import type {
	BenchmarkedArtifact,
	MinifierResult,
	MinifierResultSuccess,
} from '@minification-benchmarks/bench/types';
import * as mdu from '@minification-benchmarks/utils/mdu';
import { percent } from '@minification-benchmarks/utils/formatting';
import type { Artifact } from '@minification-benchmarks/artifacts';

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
	current: MinifierResultSuccess,
	fastest?: MinifierResultSuccess,
) => (
	(fastest === current)
		? ''
		: mdu.emphasize(`${Math.floor(current.data.raw.averageTime / fastest!.data.raw.averageTime)}x`)
);

const PositiveInfinity = Number.POSITIVE_INFINITY;

const getBenchmarkTable = (
	artifact: Artifact,
	minifierResults: MinifierResult[],
) => {
	const successfulMinifiers = minifierResults.filter(minifier => !('error' in minifier)) as MinifierResultSuccess[];
	const bestMinified = minBy(successfulMinifiers, 'data.raw.minifiedSize');
	const bestMinzipped = minBy(successfulMinifiers, 'data.raw.minzippedSize');
	const bestSpeed = minBy(successfulMinifiers, 'data.raw.averageTime');

	return [
		['Minifier', 'Minified size', 'Minzipped size', 'Time'].map(mdu.strong),
		...minifierResults
			.sort(
				(a, b) => (
					('error' in a ? PositiveInfinity : a.data.raw.minzippedSize)
					- ('error' in b ? PositiveInfinity : b.data.raw.minzippedSize)
				),
			)
			.map((minifier) => {
				const minifierLink = mdu.link(minifier.name, `/lib/minifiers/${minifier.name}.ts`);

				if ('error' in minifier) {
					return [
						`${minifierLink} ${mdu.sub(`_${minifier.error}_`)}`,
						'—',
						'—',
						'—',
					];
				}

				return [
					minifierLink,
					displayColumn(
						minifier.data.formatted.minifiedSize,
						percent(artifact.size, minifier.data.raw.minifiedSize),
						minifier === bestMinified,
					),
					displayColumn(
						minifier.data.formatted.minzippedSize,
						percent(artifact.gzipSize, minifier.data.raw.minzippedSize),
						minifier === bestMinzipped,
					),
					displayColumn(
						minifier.data.formatted.averageTime,
						compareSpeed(minifier, bestSpeed),
						minifier === bestSpeed,
					),
				];
			}),
	];
};

export const getBenchmarkDataTables = (
	artifactMinifierBenchmarks: BenchmarkedArtifact[],
) => artifactMinifierBenchmarks.map(
	({ artifact, benchmarkResults }) => outdent`
			${
				markdownTable([
					['Artifact', 'Original size', 'Gzip size'],
					[
						`${mdu.link(
							`${artifact.packageName} v${artifact.packageVersion}`,
							`https://www.npmjs.com/package/${artifact.packageName}/v/${artifact.packageVersion}`,
						)} (${mdu.link('Source', `https://unpkg.com/${artifact.packageName}@${artifact.packageVersion}${artifact.modulePath}`)})`,
						mdu.c(byteSize(artifact.size).toString()),
						mdu.c(byteSize(artifact.gzipSize).toString()),
						'',
					],

					...getBenchmarkTable(artifact, benchmarkResults),
				], {
					align: ['l', 'r', 'r', 'r'],
				})
			}
		`,
).join('\n----\n');

const README_PATH = path.resolve('./README.md');

export const updateReadmeMd = async (benchmarks: string) => {
	const readmeMd = commentMark(await fs.readFile(README_PATH), {
		lastUpdated: format(new Date(), 'MMM d, y'),
		benchmarks,
	});

	await fs.writeFile(README_PATH, readmeMd);
};
