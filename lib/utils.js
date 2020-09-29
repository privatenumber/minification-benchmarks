const zlib = require('zlib');

const getStringSize = string => Buffer.byteLength(string, 'utf8');
const getStringGzipSize = string => zlib.gzipSync(string).length;

async function measure({name, minify}) {
	const start = process.hrtime();
	let hrtime;
	let code;
	try {
		code = await minify();
		hrtime = process.hrtime(start);
	} catch (err) {
		console.error(name, err);
	}

	const success = Boolean(code);
	const size = success && getStringSize(code);
	const gzipSize = success && getStringGzipSize(code);

	return {
		name,
		ms: success ? (hrtime[0] * 1000) + (hrtime[1] / 1e6) : undefined,
		success,
		size,
		gzipSize,
		annotation: {}
	};
}

module.exports = {
	getStrSize: getStringSize,
	getStrGzipSize: getStringGzipSize,
	measure
};
