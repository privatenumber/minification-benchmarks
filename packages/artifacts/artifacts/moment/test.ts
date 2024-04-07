import assert from 'assert';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof import('moment')>({
	run: (moment) => {
		assert(
			moment.duration('9.22:23:24.25').asSeconds() === 858_204.25,
		);
	},
});
