import { minify } from '@swc/core';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'@swc/core',
	{
		default: async ({ code }) => {
			const minified = await minify(code, {
				compress: {
					toplevel: true,
				},
				mangle: {
					topLevel: true
				},
				sourceMap: false,
				module: true
			});

			return minified.code;
		},
	},
);
