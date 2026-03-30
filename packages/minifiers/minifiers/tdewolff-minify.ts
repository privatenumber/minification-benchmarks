import { minify } from '@tdewolff/minify';
import { createMinifier } from '../utils/create-minifier.ts';

export default createMinifier(
	'@tdewolff/minify',
	{
		default: async ({ code }) => minify('application/javascript', code),
	},
);
