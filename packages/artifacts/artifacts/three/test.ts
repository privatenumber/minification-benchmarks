import assert from 'assert';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof import('three')>({
	run: ({ Vector2 }) => {
		assert(
			(new Vector2(3, 4)).manhattanDistanceTo(
				new Vector2(11, 38),
			) === 42,
		);
	},
});
