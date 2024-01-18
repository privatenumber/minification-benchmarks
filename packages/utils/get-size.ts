import zlib from 'zlib';

export const getSize = (
	code: string | Buffer,
) => Buffer.byteLength(code, 'utf8');

export const getGzipSize = (
	code: string | Buffer,
) => zlib.gzipSync(code, { level: zlib.constants.Z_BEST_COMPRESSION }).length;
