import path from 'path';
import fs from 'fs/promises';
import { markdownTable } from 'markdown-table';
import outdent from 'outdent';
import commentMark from 'comment-mark';
import byteSize from 'byte-size';
import { minBy } from 'lodash';
import * as mdu from '../utils/mdu';
import { formatMs, percent } from '../utils/formatting';
import type {
	Artifact,
	ArtifactMinifierBenchmarks,
	MinifierBenchmarksResultObject,
	BenchmarkResult,
} from '../types';

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
	current: BenchmarkResult,
	fastest: BenchmarkResult,
) => (
	(fastest === current)
		? ''
		: mdu.emphasize(`${Math.floor(current.time / fastest.time)}x`)
);

const PositiveInfinity = Number.POSITIVE_INFINITY;
function processData(results: MinifierBenchmarksResultObject) {
	return Object.entries(results).map(([minifierName, benchmarks]) => {
		const [result] = benchmarks;
		// eslint-disable-next-line unicorn/no-array-reduce
		const avgTime = benchmarks.reduce(
			(current, next) => current + next?.time,
			0,
		) / benchmarks.length;

		return {
			name: minifierName,
			...result,
			time: avgTime,
		};
	}).sort(
		(a, b) => (a.minifiedSize ?? PositiveInfinity) - (b.minifiedSize ?? PositiveInfinity),
	);
}

function getBenchmarkTable(
	artifact: Artifact,
	asdf: MinifierBenchmarksResultObject,
) {
	const results = processData(asdf);
	const smallestMinzipped = minBy(results, 'minzippedSize');
	const fastest = minBy(results, 'time');

	return markdownTable([
		['Minifier', 'Minified size', 'Minzipped size', 'Time'],
		...results.map((min, index) => [
			mdu.link(min.name, `/scripts/minifiers/${min.name}.js`) + (min.time ? '' : (` ${mdu.sub('_Failed_')}`)),
			(
				min.minifiedSize
					? displayColumn(
						byteSize(min.minifiedSize),
						percent(artifact.size, min.minifiedSize),
						index === 0,
					)
					: '—'
			),
			(
				min.minzippedSize
					? displayColumn(
						byteSize(min.minzippedSize),
						percent(artifact.gzipSize, min.minzippedSize),
						min === smallestMinzipped,
					)
					: '—'
			),
			(
				min.time
					? displayColumn(
						formatMs(min.time),
						compareSpeed(min, fastest),
						min === fastest,
					)
					: '—'
			),
		]),
	], {
		align: ['l', 'r', 'r', 'r'],
	});
}

export function getBenchmarkDataTables(artifactMinifierBenchmarks: ArtifactMinifierBenchmarks[]) {
	return artifactMinifierBenchmarks.map(
		({ artifact, results }) => outdent`
			### ${
				mdu.link(
					`${artifact.moduleName} v${artifact.moduleVersion}`,
					`https://www.npmjs.com/package/${artifact.moduleName}/v/${artifact.moduleVersion}`,
				)
			}
			- Unminified size: ${mdu.c(byteSize(artifact.size))}
			- Unminified Gzip size: ${mdu.c(byteSize(artifact.gzipSize))}

			${getBenchmarkTable(artifact, results)}
		`,
	).join('\n----\n');
}

const README_PATH = path.resolve('./readme.md');

export async function updateReadmeMd(benchmarks: string) {
	const readmeMd = commentMark(await fs.readFile(README_PATH), {
		benchmarks,
	});

	await fs.writeFile(README_PATH, readmeMd);
}
