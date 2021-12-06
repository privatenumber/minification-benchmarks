import { spawn } from 'child_process';
import { Readable, Stream } from 'stream';
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
	const minify = spawn('minify', ['--type', 'js']);

	const stream = new Readable();
	stream.push(code);
	stream.push(null);
	stream.pipe(minify.stdin);

	const minified = await stream2buffer(minify.stdout);

	return minified.toString();
});
