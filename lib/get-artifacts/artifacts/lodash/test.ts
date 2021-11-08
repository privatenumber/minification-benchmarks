import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	run(_) {
		assert(_.flow([_.add, x => x * x])(2, 3) === 25);
	},
});
