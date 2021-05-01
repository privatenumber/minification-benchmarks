import zlib from 'zlib';

const getSize = string => Buffer.byteLength(string, 'utf8');
const getGzipSize = string => zlib.gzipSync(string).length;

const getVersion = async (moduleName) => {
	// eslint-disable-next-line node/global-require
	const { version } = require(`${moduleName}/package.json`);
	return version;
};

export {
	getSize,
	getGzipSize,
	getVersion,
};
