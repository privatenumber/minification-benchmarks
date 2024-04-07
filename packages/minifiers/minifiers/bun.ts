import { spawn } from 'child_process';
import { collectStream } from '@minification-benchmarks/utils/collect-stream';
import { createMinifier } from '../utils/create-minifier.js';

const bunPath = new URL('../node_modules/.bin/bun', import.meta.url).pathname;

export default createMinifier(
	'bun',
	{
		default: async ({ filePath }) => {
			const minify = spawn(bunPath, ['build', '--no-bundle', '--minify', filePath]);
			return await collectStream(minify.stdout);
		},
	},
);
