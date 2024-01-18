import { spawn } from 'child_process';
import { minifier } from '../types.js';
import { streamToBuffer } from '@minification-benchmarks/utils/stream-to-buffer';

export default minifier(async ({ filePath }) => {
	const minify = spawn('bun', ['build', '--no-bundle', '--minify', filePath]);
	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
