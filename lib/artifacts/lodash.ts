import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'lodash',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const _ = fsRequire('/index');

		assert(_.flow([_.add, x => x * x])(2, 3) === 25);
	},
});
