import { minify } from 'oxc-minify';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'oxc-minify',
	{
		default: async ({ filePath, code }) => {
			const minified = await minify(filePath, code);
			return minified.code;
		},
	},
);
