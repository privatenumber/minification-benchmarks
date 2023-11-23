import { minify } from 'terser';
import { minifier } from '../types';

export default minifier(async ({ code }) => {
	const minified = await minify(code, {
		ecma: 2018,
		sourceMap: false,
		output: {
			comments: false,
		},
	});

	return minified.code!;
});
