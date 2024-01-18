import { minify } from 'terser';
import { minifier } from '../types.js';

export default minifier(async ({ code }) => {
	const minified = await minify(code, {
		sourceMap: false,
		compress: false,
		output: {
			comments: false,
		},
	});

	return minified.code!;
});
