import { minify } from '@minify-js/node';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'minify-js',
	{
		default: async ({ code }) => {
			const src = Buffer.from(code);
			const minified = minify('module', src);

			return minified.toString();
		},
	},
);
