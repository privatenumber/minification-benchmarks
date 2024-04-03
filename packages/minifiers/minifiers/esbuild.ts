import esbuild from 'esbuild';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'esbuild',
	{
		default: async ({ code }) => {
			const minified = await esbuild.transform(code, {
				minify: true,
				sourcemap: false,
				legalComments: 'none',
				treeShaking: true,
			});
		
			return minified.code;
		},
	},
);
