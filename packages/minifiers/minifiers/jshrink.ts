import path from 'path';
import { spawn } from 'child_process';
import { streamToBuffer } from '@minification-benchmarks/utils/stream-to-buffer';
import { minifier } from '../types.js';

export default minifier(async ({ code }) => {
	const minify = spawn('php', [path.join(__dirname, './jshrink.php')]);

	minify.stdin.write(code);
	minify.stdin.end();

	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
