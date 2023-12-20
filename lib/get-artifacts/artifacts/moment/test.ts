import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	run: (moment) => {
		assert(
			moment.duration('9.22:23:24.25').asSeconds() === 858_204.25,
		);
	},
});
