import assert from 'assert';
import UglifyJs from 'uglify-js';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(async ({ code }) => {
	const minified = await UglifyJs.minify(code, {
		sourceMap: false,
	});

	assert(!minified.error, minified.error);

	return minified.code;
});
