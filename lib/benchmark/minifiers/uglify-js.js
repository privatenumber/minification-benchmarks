import assert from 'assert';
import UglifyJs from 'uglify-js';
import measure from './measure.js';

measure(async (code) => {
	const minified = await UglifyJs.minify(code, {
		sourceMap: false,
	});
	assert(!minified.error, minified.error);
	return minified.code;
});
