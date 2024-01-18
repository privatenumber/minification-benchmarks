import { minify } from 'terser';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(async ({ code }) => {
	const minified = await minify(code, {
		ecma: 2018,
		sourceMap: false,
		output: {
			comments: false,
		},
	});

	return minified.code!;
});
