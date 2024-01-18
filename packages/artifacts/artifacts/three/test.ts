import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	run({ Vector2 }) {
		assert(
			(new Vector2(3, 4)).manhattanDistanceTo(
				new Vector2(11, 38),
			) === 42,
		);
	},
});
