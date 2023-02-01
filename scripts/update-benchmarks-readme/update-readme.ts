import path from 'path';
import fs from 'fs/promises';
import { markdownTable } from 'markdown-table';
import outdent from 'outdent';
import commentMark from 'comment-mark';
import byteSize from 'byte-size';
import { minBy } from 'lodash';
import { format } from 'date-fns';
import * as mdu from '../../lib/utils/mdu';
import { percent } from '../../lib/utils/formatting';
import type {
	Artifact,
	BenchmarkedArtifact,
	MinifierResult,
	MinifierResultSuccess,
} from '../../lib/types';

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

function getBenchmarkTable(
	artifact: Artifact,
	minifierResults: MinifierResult[],
) {
	const successfulMinifiers = minifierResults.filter(minifier => !('error' in minifier)) as MinifierResultSuccess[];
	const bestMinified = minBy(successfulMinifiers, 'data.raw.minifiedSize');
	const bestBrotliMinified = minBy(successfulMinifiers, 'data.raw.brotliMinifiedSize');
	const bestSpeed = minBy(successfulMinifiers, 'data.raw.averageTime');

	return [
		['Minifier', 'Minified size', 'Brotli size', 'Time'].map(mdu.strong),
		...minifierResults
			.sort(
				(a, b) => (
					('error' in a ? PositiveInfinity : a.data.raw.brotliMinifiedSize)
					- ('error' in b ? PositiveInfinity : b.data.raw.brotliMinifiedSize)
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
						minifier.data.formatted.brotliMinifiedSize,
						percent(artifact.brotliSize, minifier.data.raw.brotliMinifiedSize),
						minifier === bestBrotliMinified,
					),
					displayColumn(
						minifier.data.formatted.averageTime,
						compareSpeed(minifier, bestSpeed),
						minifier === bestSpeed,
					),
				];
			}),
	];
}

export function getBenchmarkDataTables(
	artifactMinifierBenchmarks: BenchmarkedArtifact[],
) {
	return artifactMinifierBenchmarks.map(
		({ artifact, benchmarkResults }) => outdent`
			${markdownTable([
			['Artifact', 'Original size', 'Brotli size'],
			[
				`${mdu.link(
					`${artifact.packageName} v${artifact.packageVersion}`,
					`https://www.npmjs.com/package/${artifact.packageName}/v/${artifact.packageVersion}`,
				)} (${mdu.link('Source', `https://unpkg.com/${artifact.packageName}@${artifact.packageVersion}${artifact.modulePath}`)})`,
				mdu.c(byteSize(artifact.size).toString()),
				mdu.c(byteSize(artifact.brotliSize).toString()),
				'',
			],

			...getBenchmarkTable(artifact, benchmarkResults),
		], {
			align: ['l', 'r', 'r', 'r'],
		})
			}
		`,
	).join('\n----\n');
}

const README_PATH = path.resolve('./readme.md');

export async function updateReadmeMd(benchmarks: string) {
	const readmeMd = commentMark(await fs.readFile(README_PATH), {
		lastUpdated: format(new Date(), 'MMM d, y'),
		benchmarks,
	});

	await fs.writeFile(README_PATH, readmeMd);
}
