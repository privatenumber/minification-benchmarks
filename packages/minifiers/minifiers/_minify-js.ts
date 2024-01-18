import { minify } from '@minify-js/node';
import { minifier } from '../types.js';

export default minifier(async ({ code }) => {
	const src = Buffer.from(code);
	const minified = minify('module', src);

	return minified.toString();
});
