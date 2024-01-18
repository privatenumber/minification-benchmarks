import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	async run({ minify }) {
		const minified = await minify('l(true)');
		assert(minified.code === 'l(!0);');
	},
});
