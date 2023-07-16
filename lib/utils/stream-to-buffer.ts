import type { Stream } from 'stream';

export const streamToBuffer = (
	stream: Stream,
) => new Promise<Buffer>((resolve, reject) => {
	const bufferChunks = new Array<any>();

	stream.on('error', reject);
	stream.on('data', chunk => bufferChunks.push(chunk));
	stream.on('end', () => resolve(Buffer.concat(bufferChunks)));
});
