import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'moment',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const moment = fsRequire('/index');

		assert(
			moment.duration('9.22:23:24.25').asSeconds() === 858204.25,
		);
	},
});
