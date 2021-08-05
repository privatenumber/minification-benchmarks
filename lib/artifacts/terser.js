import { artifactMeta } from '../types';
import path from 'path';
import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';

export default artifactMeta({
	// Can't use require resolve due to export map
	path: path.resolve('node_modules/terser/dist/bundle.min.js'),
	async test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const { minify } = fsRequire('/index');

		const minified = await minify('l(true)');

		assert(minified.code === 'l(!0);');
	},
});
