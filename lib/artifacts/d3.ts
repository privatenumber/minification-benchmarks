import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { artifactMeta } from '../types';
import 'jsdom-global/register.js';

export default artifactMeta({
	path: 'd3/dist/d3.js',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const d3 = fsRequire('/index');

		const svg = d3.select(document.body).append('svg').attr('width', 100).attr('height', 100);
		svg.append('circle').style('fill', 'green').attr('r', 40).attr('cx', 50)
			.attr('cy', 50);

		assert(
			document.body.innerHTML === '<svg width="100" height="100"><circle style="fill: green;" r="40" cx="50" cy="50"></circle></svg>',
		);
	},
});
