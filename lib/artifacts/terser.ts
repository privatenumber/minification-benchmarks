import path from 'path';
import assert from 'assert';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	// Can't use require resolve due to export map
	path: path.resolve('node_modules/terser/dist/bundle.min.js'),
	async test(code) {
		const { minify } = requireString(code);

		const minified = await minify('l(true)');

		assert(minified.code === 'l(!0);');
	},
});
