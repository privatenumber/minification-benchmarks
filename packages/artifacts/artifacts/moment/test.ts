import assert from 'assert';
import type moment from 'moment';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof moment>({
	run: (moment) => {
		assert.ok(
			moment.duration('9.22:23:24.25').asSeconds() === 858_204.25,
		);
	},
});
