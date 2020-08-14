const {promises: fs} = require('fs');
const _ = require('lodash');
const minifiers = require('./minifiers');
const md = require('./md');
const {getStrGzipSize} = require('./utils');

(async packages => {
	let results = '';

	for (const pkg of packages) {
		const pkgPath = require.resolve(pkg);
		const content = await fs.readFile(pkgPath); // eslint-disable-line no-await-in-loop
		const benchmarks = await minifiers.runMinifiers(content.toString()); // eslint-disable-line no-await-in-loop

		const ms = benchmarks.filter(b => b.ms);
		_.minBy(ms, 'ms').annotation.time = '🐇';
		_.maxBy(ms, 'ms').annotation.time = '🐢';

		const size = benchmarks.filter(b => b.size);
		_.minBy(size, 'size').annotation.size = '🐥';
		_.maxBy(size, 'size').annotation.size = '🐷';

		const gzip = benchmarks.filter(b => b.gzipSize);
		_.minBy(gzip, 'gzipSize').annotation.gzip = '🐥';
		_.maxBy(gzip, 'gzipSize').annotation.gzip = '🐷';

		results += md.moduleSection({
			pkg,
			pkgPath,
			size: content.length,
			gzipSize: getStrGzipSize(content),
			benchmarks
		});
	}

	const mdString = md.readme({
		minifiersList: minifiers.minifiers.map(m => `- [${m.name}](${m.repo})`).join('\n'),
		results
	});

	await fs.writeFile('./readme.md', mdString);
})([
	'lodash',
	'vue/dist/vue.runtime.common.dev',
	'react/cjs/react.development.js',
	'moment',
	'terser',
	'd3/dist/d3',
	'jquery'
].sort());
