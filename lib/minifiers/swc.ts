import swc from '@swc/core';
import { minifier } from '../types';

export default minifier(async ({ code }) => {
	const minified = await swc.minify(code, {
		compress: true,
		mangle: true,
		sourceMap: false,
	});

	return minified.code;
});
