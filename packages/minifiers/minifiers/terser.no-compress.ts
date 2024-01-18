import { minify } from 'terser';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(async ({ code }) => {
	const minified = await minify(code, {
		sourceMap: false,
		compress: false,
		output: {
			comments: false,
		},
	});

	return minified.code!;
});
