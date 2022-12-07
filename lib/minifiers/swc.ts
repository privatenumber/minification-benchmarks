import { minify } from '@swc/core';
import { minifier } from '../types';

export default minifier(async ({ code }) => {
	const minified = await minify(code, {
		compress: {
			// passes: 1,
		},
		mangle: true,
		sourceMap: false,
	});

	return minified.code;
});
