import zlib from 'zlib';

export const getSize = (
	code: string | Buffer,
) => Buffer.byteLength(code, 'utf8');

export const getBrotliSize = (
	code: string | Buffer,
) => zlib.brotliCompressSync(code, {
	[zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
}).length;
