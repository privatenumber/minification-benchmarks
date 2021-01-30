import swc from '@swc/core';
import measure from './measure.js';

measure(async ({ code }) => {
	const minified = (await swc.transform(code, {
		minify: true,
		sourceMaps: false,
		swcrc: false,
	}));
	return minified.code;
});
