import assert from 'assert';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'three',
	test(code) {
		const { Vector2 } = requireString(code);

		assert(
			(new Vector2(3, 4)).manhattanDistanceTo(
				new Vector2(11, 38),
			) === 42,
		);
	},
});
