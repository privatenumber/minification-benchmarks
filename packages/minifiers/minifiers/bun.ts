import { spawn } from 'child_process';
import { streamToBuffer } from '@minification-benchmarks/utils/stream-to-buffer';
import { minifier } from '../types.js';

export default minifier(async ({ filePath }) => {
	const minify = spawn('bun', ['build', '--no-bundle', '--minify', filePath]);
	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
