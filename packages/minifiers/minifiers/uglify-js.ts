import assert from 'assert';
import UglifyJs from 'uglify-js';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'uglify-js',
	{
		default: async ({ code }) => {
			const minified = await UglifyJs.minify(code, {
				sourceMap: false,
			});

			assert.ok(!minified.error, minified.error);

			return minified.code;
		},
		'no compress': async ({ code }) => {
			const minified = await UglifyJs.minify(code, {
				sourceMap: false,
				compress: false,
			});

			assert.ok(!minified.error, minified.error);

			return minified.code;
		},
	},
);
