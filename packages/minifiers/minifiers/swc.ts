import { minify } from '@swc/core';
import { minifier } from '../types.js';

export default minifier(async ({ code }) => {
	const minified = await minify(code, {
		compress: true,
		mangle: true,
		sourceMap: false,
	});

	return minified.code;
});
