import assert from 'assert';
import type three from 'three';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof three>({
	run: ({ Vector2 }) => {
		assert.ok(
			(new Vector2(3, 4)).manhattanDistanceTo(
				new Vector2(11, 38),
			) === 42,
		);
	},
});
