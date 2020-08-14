const zlib = require('zlib');

const getStrSize = str => Buffer.byteLength(str, 'utf8');
const getStrGzipSize = str => zlib.gzipSync(str).length;

async function measure({ name, minify }) {
	const start = process.hrtime();
	let hrtime;
	let code;
	try {
		code = await minify();
		hrtime = process.hrtime(start);
	} catch(_err) {}

	const success = !!code;
	const size = success && getStrSize(code);
	const gzipSize = success && getStrGzipSize(code);

	return {
		name,
		ms: success ? (hrtime[0] * 1000) + (hrtime[1] / 1e6) : undefined,
		success,
		size,
		gzipSize,
		annotation: {},
	};
}

module.exports = {
	getStrSize,
	getStrGzipSize,
	measure,
};
