import { minify } from 'terser';
import { minifier } from '../types';

export default minifier(async ({ code }) => {
	const minified = await minify(code, {
		sourceMap: false,
		output: {
			comments: false,
		},
		compress: {
			passes: 2,
		}
	});

	return minified.code!;
});
