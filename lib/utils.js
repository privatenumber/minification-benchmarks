const zlib = require('zlib');

const getStrSize = str => Buffer.byteLength(str, 'utf8');
const getStrGzipSize = str => zlib.gzipSync(str).length;

const formatTime = ms => `${ms.toFixed(2)}ms`;
const compressionRate = (from, to) => Math.floor((to / from) * 100) + '%';

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
	formatTime,
	compressionRate,
	measure,
};
