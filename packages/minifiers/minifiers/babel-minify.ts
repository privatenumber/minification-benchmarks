import babelMinify from 'babel-minify';
import { minifier } from '../types.js';

export default minifier(async ({ code }) => {
	const minified = await babelMinify(code, undefined, {
		sourceMaps: false,
		comments: false,
	});

	return minified.code as string;
});
