import path from 'path';
import { promises as fs } from 'fs';
import markdownTable from 'markdown-table';
import outdent from 'outdent';
import commentMark from 'comment-mark';
import byteSize from 'byte-size';
import minBy from 'lodash/minBy.js';
import property from 'lodash/property.js';

const formatMs = ms => `${ms.toLocaleString(undefined, { maximumFractionDigits: 0 })}ms`;
const c = string => `\`${string}\``;
const sup = string => `<sup>${string}</sup>`;
const sub = string => `<sub>${string}</sub>`;
const strong = string => `**${string}**`;
const emphasize = string => `*${string}*`;
const link = (label, href) => `[${label}](${href})`;
const smallestAscending = ([, a], [, b]) => {
	if (!a.size) {
		return 1;
	}
	if (!b.size) {
		return -1;
	}
	return (a.size - b.size);
};
const percent = (from, to) => `${Math.floor(((to - from) / from) * 100)}%`;
const smallest = (array, propertyPath) => {
	const getPath = property(propertyPath);
	return minBy(array.filter(object => getPath(object)), getPath);
};

const README_PATH = path.resolve('./readme.md');

const displayColumn = ({
	value,
	annotation,
	isWinner,
}) => {
	const columnText = (
		sup(`${isWinner ? '🏆' : ''}${annotation || ''} `)
		+ c(value)
	);

	return isWinner ? strong(columnText) : columnText;
};

const compareSpeed = (fastest, current) => ((fastest === current) ? '' : emphasize(`${Math.floor(current.ms / fastest.ms)}x`));

const task = {
	title: 'Update README.md',
	async task({ artifacts, results }) {
		const benchmarksMd = artifacts.map((artifact) => {
			const result = results[artifact.moduleName];
			const benchmarks = Object.entries(result.benchmarks);

			const [, fastest] = smallest(benchmarks, '[1].ms');
			const [, smallestGzip] = smallest(benchmarks, '[1].gzipSize');

			const table = markdownTable([
				['Minifier', 'Minified size', 'Minzipped size', 'Time'],
				...benchmarks
					.sort(smallestAscending)
					.map(([minifier, benchmark], index) => [
						link(minifier, `/lib/benchmark/minifiers/${minifier}.js`) + (benchmark.ms ? '' : (` ${sub('_Failed_')}`)),
						(
							benchmark.size
								? displayColumn({
									value: byteSize(benchmark.size),
									annotation: percent(result.size, benchmark.size),
									isWinner: index === 0,
								})
								: '—'
						),
						(
							benchmark.gzipSize
								? displayColumn({
									value: byteSize(benchmark.gzipSize),
									annotation: percent(result.gzipSize, benchmark.gzipSize),
									isWinner: smallestGzip === benchmark,
								})
								: '—'
						),
						(
							benchmark.ms
								? displayColumn({
									value: formatMs(benchmark.ms),
									isWinner: fastest === benchmark,
									annotation: compareSpeed(fastest, benchmark),
								})
								: '—'
						),
					]),
			], {
				align: ['l', 'r', 'r', 'r'],
			});

			return outdent`
			### [${artifact.moduleName} v${artifact.version}](https://www.npmjs.com/package/${artifact.moduleName}/v/${artifact.version})
			- Unminified size: ${c(byteSize(result.size))}
			- Unminified Gzip size: ${c(byteSize(result.gzipSize))}

			${table}
			`;
		}).join('\n----\n');

		const readmeMd = commentMark(await fs.readFile(README_PATH), {
			benchmarks: benchmarksMd,
		});

		await fs.writeFile(README_PATH, readmeMd);
	},
};

export default task;
