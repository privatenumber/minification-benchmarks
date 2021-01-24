import { minify } from 'terser';
import measure from './measure.js';

measure(async ({ code }) => {
	const minified = await minify(code, {
		sourceMap: false,
	});
	return minified.code;
});
