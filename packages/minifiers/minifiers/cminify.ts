import { createMinifier } from '../utils/create-minifier.ts';
import { runMinifier } from '../utils/run-minifier.ts';

export default createMinifier(
	'@cminify/cminify-linux-x64',
	{
		default: async ({ code }) => {
			const executable = new URL('../node_modules/.bin/cminify', import.meta.url).pathname;
			return runMinifier(executable, ['js', '-'], { input: code });
		},
	},
);
