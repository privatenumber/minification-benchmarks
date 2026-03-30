import { minify } from '@swc/core';
import { createMinifier } from '../utils/create-minifier.ts';

export default createMinifier(
	'@swc/core',
	{
		default: async ({ code }) => {
			const minified = await minify(code, {
				compress: true,
				mangle: true,
				sourceMap: false,
			});

			return minified.code;
		},
	},
);
