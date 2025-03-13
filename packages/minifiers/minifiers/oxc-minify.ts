import { minify } from 'oxc-minify';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'oxc-minify',
	{
		default: async ({ filePath, code }) => {
			const minified = minify(filePath, code, {
				compress: {
					target: 'es2020',
				},
			});
			return minified.code;
		},
	},
);
