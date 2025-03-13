import { minify } from '@swc/core';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'@swc/core',
	{
		default: async ({ code }) => {
			const minified = await minify(code, {
				compress: {
					ecma: 'es2020',
				},
				mangle: true,
				sourceMap: false,
			});

			return minified.code;
		},
	},
);
