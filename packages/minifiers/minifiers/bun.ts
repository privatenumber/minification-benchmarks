import { spawn } from 'child_process';
import { streamToBuffer } from '@minification-benchmarks/utils/stream-to-buffer';
import { minifier } from '../types.js';

const bunPath = new URL('../node_modules/.bin/bun', import.meta.url).pathname;

export default minifier(async ({ filePath }) => {
	const minify = spawn(bunPath, ['build', '--no-bundle', '--minify', filePath]);
	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
