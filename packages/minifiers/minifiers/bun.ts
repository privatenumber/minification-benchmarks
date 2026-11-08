import { createMinifier } from '../utils/create-minifier.ts';
import { runMinifier } from '../utils/run-minifier.ts';

const bunPath = new URL('../node_modules/.bin/bun', import.meta.url).pathname;

export default createMinifier(
	'bun',
	{
		default: async ({ filePath }) => runMinifier(bunPath, ['build', '--no-bundle', '--minify', filePath]),
	},
);
