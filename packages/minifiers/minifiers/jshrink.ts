import { spawn } from 'child_process';
import { streamToBuffer } from '@minification-benchmarks/utils/stream-to-buffer';
import { minifier } from '../types.js';

const jshrinkPath = new URL('jshrink.php', import.meta.url).pathname;

export default minifier(async ({ code }) => {
	const minify = spawn('php', [jshrinkPath]);

	minify.stdin.write(code);
	minify.stdin.end();

	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
