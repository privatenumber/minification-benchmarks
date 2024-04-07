import assert from 'assert';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof import('terser')>({
	run: async ({ minify }) => {
		const minified = await minify('l(true)');
		assert(minified.code === 'l(!0);');
	},
});
