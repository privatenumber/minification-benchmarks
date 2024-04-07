import type { Stream } from 'stream';

export const collectStream = (
	stream: Stream,
) => new Promise<string>((resolve, reject) => {
	const bufferChunks = new Array<Buffer>();

	stream.on('error', reject);
	stream.on('data', chunk => bufferChunks.push(chunk));
	stream.on('end', () => resolve(
		Buffer.concat(bufferChunks).toString(),
	));
});
