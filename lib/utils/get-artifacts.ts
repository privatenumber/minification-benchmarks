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
const artifactDirectory = path.resolve(__dirname, '../artifacts');

export const getArtifact = async (
	artifactFilePath: string,
): Promise<Artifact> => {
	// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
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
	const artifactMetaFiles = await fs.readdir(artifactDirectory);
	const artifactMetaObjects = artifactMetaFiles.filter(
		artifactMetaPath => artifactMetaPath.endsWith('.ts'),
	);

	const artifacts = await Promise.all(artifactMetaObjects.map(
		async artifactMetaPath => await getArtifact(path.join(artifactDirectory, artifactMetaPath)),
	));

	artifacts.sort(
		(a, b) => a.size - b.size,
	);

	return artifacts;
};
