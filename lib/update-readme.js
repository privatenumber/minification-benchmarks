import markdownTable from 'markdown-table';
import outdent from 'outdent';
import commentMark from 'comment-mark';
import path from 'path';
import { promises as fs } from 'fs';
import byteSize from 'byte-size';
import minBy from 'lodash/minBy.js';
import maxBy from 'lodash/maxBy.js';
import property from 'lodash/property.js';

const formatMs = ms => `${ms.toLocaleString(undefined, { maximumFractionDigits: 2 })}ms`;
const c = str => `\`${str}\``;
const sup = str => `<sup>${str}</sup>`;
const sub = str => `<sub>${str}</sub>`;
const link = (label, href) => `[${label}](${href})`;
const smallestAscending = ([,a], [,b]) => {
	if (!a.size) { return 1; }
	if (!b.size) { return -1; }
	return (a.size - b.size);
};
const percent = (from, to) => Math.floor(((to - from) / from) * 100) + '%';
const smallest = (array, path) => {
	const getPath = property(path);
	return minBy(array.filter(getPath), getPath);
};

const README_PATH = path.resolve('./readme.md');

const task = {
	title: 'Update README.md',
	async task({ artifacts, results }) {

		const benchmarksMd = artifacts.map((artifact) => {
			const result = results[artifact.moduleName];
			const benchmarks = Object.entries(result.benchmarks);

			const fastest = smallest(benchmarks, '[1].ms');
			const smallestGzip = smallest(benchmarks, '[1].gzipSize');

			const table = markdownTable([
				['Minifier', 'Minified size', 'Minzipped size', 'Time'],
				...benchmarks
					.sort(smallestAscending)
					.map(([minifier, benchmark], index) => [
						link(minifier, `/lib/benchmark/minifiers/${minifier}.js`) + (benchmark.ms ? '' : (' ' + sub('_Failed_'))),
						benchmark.size ? (sup((index === 0 ? '🏆 ' : '') + percent(result.size, benchmark.size) + ' ') + c(byteSize(benchmark.size))) : '—',
						benchmark.gzipSize ? (sup((smallestGzip[1] === benchmark ? '🏆 ' : '') + percent(result.gzipSize, benchmark.gzipSize) + ' ') + c(byteSize(benchmark.gzipSize))) : '—',
						benchmark.ms ? ((fastest[1] === benchmark ? sup('🏆 ') : '') + c(formatMs(benchmark.ms))) : '—',
					]),
			], {
				align: ['l', 'r', 'r', 'r'],
			});
			
			return outdent`
			### [${artifact.moduleName} v${artifact.version}](https://www.npmjs.com/package/${artifact.moduleName}/v/${artifact.version})
			- Size: ${c(byteSize(result.size))}
			- Gzip size: ${c(byteSize(result.gzipSize))}

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
