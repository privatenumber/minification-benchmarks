import babelMinify from 'babel-minify';
import measure from './measure.js';

measure(async (code) => {
	const minified = await babelMinify(code, undefined, {
		sourceMaps: false,
	});
	return minified.code;
});
