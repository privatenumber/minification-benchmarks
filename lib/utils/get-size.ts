import zlib from 'zlib';

export const getSize = (
	code: string | Buffer,
) => Buffer.byteLength(code, 'utf8');

export const getGzipSize = (
	code: string | Buffer,
) => zlib.gzipSync(code).length;
