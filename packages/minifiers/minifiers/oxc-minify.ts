import { minifySync } from 'oxc-minify';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'oxc-minify',
	{
		default: async ({ filePath, code }) => {
			// Using the sync version because the async version spawns a real thread, which is slow for js benchmarks.
			const minified = minifySync(filePath, code);
			return minified.code;
		},
	},
);
