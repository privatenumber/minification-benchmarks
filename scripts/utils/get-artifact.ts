import fs from 'fs/promises';
import path from 'path';
import { readPackageUpAsync as readPkgUp } from 'read-pkg-up';
import { getSize, getGzipSize } from './get-size';
import type { Artifact } from '../types';

const readPublicPkgUp = async (cwd: string) => {
	let pkg = await readPkgUp({ cwd });
	while (pkg.packageJson.private) {
		pkg = await readPkgUp({
			cwd: path.join(path.dirname(pkg.path), '..'),
		});
	}
	return pkg.packageJson;
};

const isFilePathPattern = /^[\/\.]/;

export const getArtifact = async (
	modulePath: string,
): Promise<Artifact> => {
	if (!isFilePathPattern.test(modulePath)) {
		modulePath = require.resolve(modulePath);
	}

	const [
		packageJson,
		code,
	] = await Promise.all([
		readPublicPkgUp(modulePath),
		fs.readFile(modulePath),
	]);
	
	return {
		moduleName: packageJson.name,
		moduleVersion: packageJson.version,
		modulePath,
		code,
		size: getSize(code),
		gzipSize: getGzipSize(code),
	};
};
