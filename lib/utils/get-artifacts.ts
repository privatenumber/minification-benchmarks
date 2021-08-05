import fs from 'fs/promises';
import path from 'path';
import { readPackageUpAsync } from 'read-pkg-up';
import type { Artifact, ArtifactMeta } from '../types';
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
const artifactDir = path.resolve(__dirname, '../artifacts');

export const getArtifact = async (
	artifactFilePath: string,
): Promise<Artifact> => {
	const artifactMetaObject = require(artifactFilePath).default as ArtifactMeta;

	let { path: modulePath } = artifactMetaObject;
	if (!isFilePathPattern.test(modulePath)) {
		modulePath = require.resolve(modulePath); // resolve alias
	}

	const [
		packageJson,
		code,
	] = await Promise.all([
		readPublicPackageUp(modulePath),
		fs.readFile(modulePath),
	]);

	return {
		artifactFilePath,
		moduleName: packageJson.name,
		moduleVersion: packageJson.version,
		modulePath,
		code,
		size: getSize(code),
		gzipSize: getGzipSize(code),
	};
};

export const getArtifacts = async () => {
	const artifactMetaFiles = await fs.readdir(artifactDir);
	const artifactMetaObjects = artifactMetaFiles.filter(
		artifactMetaPath => artifactMetaPath.endsWith('.ts')
	);

	const artifacts = await Promise.all(artifactMetaObjects.map(
		async artifactMetaPath => await getArtifact(path.join(artifactDir, artifactMetaPath)),
	));

	artifacts.sort(
		(a, b) => a.size - b.size,
	);

	return artifacts;
};
