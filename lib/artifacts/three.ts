import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'three',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const { Vector2 } = fsRequire('/index');

		assert(
			(new Vector2(3, 4)).manhattanDistanceTo(
				new Vector2(11, 38),
			) === 42,
		);
	},
});
