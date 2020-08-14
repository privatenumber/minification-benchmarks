const table = require('markdown-table');
const { promises: fs } = require('fs');
const outdent = require('outdent');
const filesize = require('filesize');
const path = require('path');
const _ = require('lodash');
const minifiers = require('./minifiers');
const { getStrSize, getStrGzipSize, formatTime, compressionRate } = require('./utils');

(async (packages) => {
	let mdStr = outdent`
	# Minification benchmarks


	`;

	for (let package of packages) {
		const pkgPath = require.resolve(package);
		const content = await fs.readFile(pkgPath);
		const size = content.length;
		const gzipSize = getStrGzipSize(content);
		const code = content.toString();

		const results = await minifiers(code);

		const bestTime = _.minBy(results, 'ms');
		bestTime.best.time = true;

		const bestSize = _.minBy(results, 'size');
		bestSize.best.size = true;

		const bestGzip = _.minBy(results, 'gzipSize');
		bestGzip.best.gzip = true;

		const mdtable = table([
			['Minifier', 'Size', 'Gzip size', 'Time'],
			...results.map(r => [
				r.name,
				(r.best.size ? '🏆 ' : '') + `${filesize(r.size)} (${compressionRate(size, r.size)})`,
				(r.best.gzip ? '🏆 ' : '') + `${filesize(r.gzipSize)} (${compressionRate(gzipSize, r.gzipSize)})`,
				(r.best.time ? '🏆 ' : '') + formatTime(r.ms),
			]),
		],   {align: ['l', 'r', 'r', 'r']});

		mdStr += outdent`
		### ${package}
		**File** \`${path.relative(process.cwd(), pkgPath)}\`
		**Size** \`${filesize(size)}\`
		**Gzip size** \`${filesize(gzipSize)}\`

		${mdtable}


		`;
	}

	await fs.writeFile('./readme.md', mdStr);
})([
	'lodash',
	'vue/dist/vue.runtime.common.dev',
	'react/cjs/react.development.js',
	'moment',
	'terser',
]);