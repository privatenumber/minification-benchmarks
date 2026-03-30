import { minifySync } from 'oxc-minify';
import { createMinifier } from '../utils/create-minifier.ts';

export default createMinifier(
	'oxc-minify',
	{
		default: async ({ filePath, code }) => {
			// async version spawns a thread, which can be slower
			const minified = minifySync(filePath, code);
			return minified.code;
		},
	},
);
