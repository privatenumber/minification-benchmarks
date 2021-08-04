import assert from 'assert';
import UglifyJs from 'uglify-js';
import { minifier } from '../types';

export default minifier(async ({ code }) => {
	const minified = await UglifyJs.minify(code, {
		sourceMap: false,
	});

	assert(!minified.error, minified.error);

	return minified.code;
});
