import { promises as fs } from 'fs';
import zlib from 'zlib';

const getSize = string => Buffer.byteLength(string, 'utf8');
const getGzipSize = string => zlib.gzipSync(string).length;

const resolveModule = async (specifier) => {
	const modulePath = await import.meta.resolve(specifier);
	return modulePath.replace(/^file:\/\//, '');
};

const getVersion = async (moduleName) => {
	const packageJsnString = await fs.readFile(await resolveModule(`${moduleName}/package.json`));
	return JSON.parse(packageJsnString).version;
};

export {
	getSize,
	getGzipSize,
	resolveModule,
	getVersion,
};
