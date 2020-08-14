const table = require('markdown-table');
const { promises: fs } = require('fs');
const outdent = require('outdent');
const filesize = require('filesize');
const path = require('path');
const _ = require('lodash');
const minifiers = require('./minifiers');
const md = require('./md');
const { getStrSize, getStrGzipSize } = require('./utils');


(async (packages) => {
	let results = '';

	for (let package of packages) {
		const pkgPath = require.resolve(package);
		const content = await fs.readFile(pkgPath);
		const benchmarks = await minifiers.runMinifiers(content.toString());

		_.minBy(benchmarks, 'ms').best.time = true;
		_.minBy(benchmarks, 'size').best.size = true;
		_.minBy(benchmarks, 'gzipSize').best.gzip = true;

		results += md.moduleSection({
			package,
			pkgPath,
			size: content.length,
			gzipSize: getStrGzipSize(content),
			benchmarks,
		});
	}

	const mdStr = md.readme({
		minifiersList: minifiers.minifiers.map(m => `- [${m.name}](${m.repo})`).join('\n'),
		results,
	});

	await fs.writeFile('./readme.md', mdStr);
})([
	'lodash',
	'vue/dist/vue.runtime.common.dev',
	'react/cjs/react.development.js',
	'moment',
	'terser',
]);