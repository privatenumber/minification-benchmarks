import fs from 'fs/promises';
import path from 'path';
import { readPackageUpAsync } from 'read-pkg-up';
import type { Artifact } from '../types';
import artifactPaths from '../artifacts';
import { getSize, getGzipSize } from './get-size';

const readPublicPackageUp = async (cwd: string) => {
	let packageFound = await readPackageUpAsync({ cwd });
	while (packageFound.packageJson.private) {
		packageFound = await readPackageUpAsync({
			cwd: path.join(path.dirname(packageFound.path), '..'),
		});
	}
	return packageFound.packageJson;
};

const isFilePathPattern = /^[./]/;

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
		readPublicPackageUp(modulePath),
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

export const getArtifacts = async () => {
	const artifacts = await Promise.all(artifactPaths.map(
		async filePath => await getArtifact(filePath),
	));

	artifacts.sort(
		(a, b) => a.moduleName.localeCompare(b.moduleName),
	);

	return artifacts;
};
