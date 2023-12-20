import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	run: async ({ minify }) => {
		const minified = await minify('l(true)');
		assert(minified.code === 'l(!0);');
	},
});
