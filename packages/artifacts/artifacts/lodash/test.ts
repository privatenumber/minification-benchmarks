import assert from 'assert';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof import('lodash')>({
	run(_) {
		assert(_.flow([_.add, (x: number) => x * x])(2, 3) === 25);
	},
});
