import babelMinify from 'babel-minify';
import { createMinifier } from '../utils/create-minifier.ts';

export default createMinifier(
	'babel-minify',
	{
		default: async ({ code }) => {
			const minified = await babelMinify(code, undefined, {
				sourceMaps: false,
				comments: false,
			});

			return minified.code;
		},
	},
);
