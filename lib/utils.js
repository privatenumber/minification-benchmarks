import { promises as fs } from 'fs';
import zlib from 'zlib';

export const getSize = string => Buffer.byteLength(string, 'utf8');
export const getGzipSize = string => zlib.gzipSync(string).length;

export const resolveModule = async (specifier) => {
	const modulePath = await import.meta.resolve(specifier);
	return modulePath.replace(/^file:\/\//, '');
};

export const getVersion = async (moduleName) => {
	const pkgJsnStr = await fs.readFile(await resolveModule(moduleName + '/package.json'));
	return JSON.parse(pkgJsnStr).version;
};
