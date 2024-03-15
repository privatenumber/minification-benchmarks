import assert from 'assert';
import UglifyJs from 'uglify-js';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'uglify-js',
	{
		'uglify-js': async ({ code }) => {
			const minified = await UglifyJs.minify(code, {
				sourceMap: false,
			});

			assert(!minified.error, minified.error);

			return minified.code;
		},
		'uglify-js (no compress)': async ({ code }) => {
			const minified = await UglifyJs.minify(code, {
				sourceMap: false,
				compress: false,
			});
		
			assert(!minified.error, minified.error);
		
			return minified.code;
		},
	},
);
