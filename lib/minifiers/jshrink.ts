import path from 'path';
import { spawn } from 'child_process';
import type { Stream } from 'stream';
import { minifier } from '../types';

const stream2buffer = (
	stream: Stream,
) => new Promise<Buffer>((resolve, reject) => {
	const bufferChunks = new Array<any>();

	stream.on('error', reject);
	stream.on('data', chunk => bufferChunks.push(chunk));
	stream.on('end', () => resolve(Buffer.concat(bufferChunks)));
});

export default minifier(async ({ code }) => {
	const minify = spawn('php', [path.join(__dirname, './jshrink.php')]);

	minify.stdin.write(code);
	minify.stdin.end();

	const minified = await stream2buffer(minify.stdout);
	return minified.toString();
});
