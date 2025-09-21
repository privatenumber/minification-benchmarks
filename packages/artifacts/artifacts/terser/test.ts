import assert from 'assert';
import type * as terser from 'terser';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof terser>({
	run: async ({ minify }) => {
		const minified = await minify('l(true)');
		assert.ok(minified.code === 'l(!0);');
	},
});
