const zlib = require('zlib');

const getStrSize = str => Buffer.byteLength(str, 'utf8');
const getStrGzipSize = str => zlib.gzipSync(str).length;


async function measure({ name, minify }) {
	const start = process.hrtime();
	const code = await minify();
	const hrtime = process.hrtime(start);
	const ms = (hrtime[0] * 1000) + (hrtime[1] / 1e6);

	const size = getStrSize(code);
	const gzipSize = getStrGzipSize(code);

	return {
		name,
		ms,
		size,
		gzipSize,
		best: {},
	};
}

module.exports = {
	getStrSize,
	getStrGzipSize,
	measure,
};
