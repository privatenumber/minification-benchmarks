import assert from 'assert';
import type lodash from 'lodash';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof lodash>({
	run: (_) => {
		assert.ok(_.flow([_.add, (x: number) => x * x])(2, 3) === 25);
	},
});
