import path from 'path';
import { spawn } from 'child_process';
import { minifier } from '../types';
import { streamToBuffer } from '../utils/stream-to-buffer';

export default minifier(async ({ code }) => {
	const minify = spawn('php', [path.join(__dirname, './jshrink.php')]);

	minify.stdin.write(code);
	minify.stdin.end();

	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
