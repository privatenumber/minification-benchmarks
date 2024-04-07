import { string } from '@tdewolff/minify';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'@tdewolff/minify',
	{
		default: async ({ code }) => {
			const minified = string('application/javascript', code);
			return minified;
		},
	},
);
