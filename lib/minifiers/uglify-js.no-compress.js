import assert from 'assert';
import UglifyJs from 'uglify-js';

export default async ({ code }) => {
	const minified = await UglifyJs.minify(code, {
		sourceMap: false,
		compress: false,
	});
	assert(!minified.error, minified.error);
	return minified.code;
};
