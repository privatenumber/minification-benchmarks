import UglifyJs from 'uglify-js';
import assert from 'assert';
import measure from './measure.js';

measure(async (code) => {
	const minified = await UglifyJs.minify(code, {
		sourceMap: false,
		compress: false,
	});
	assert(!minified.error, minified.error);
	return minified.code;
});
