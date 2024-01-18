import fs from 'fs/promises';
import path from 'path';
import assert from 'assert';
import { readPackageUp } from 'read-pkg-up';
import { getSize, getGzipSize } from '@minification-benchmarks/utils/get-size';
import type { Artifact, ArtifactMeta } from '../types';

const readPublicPackageUp = async (cwd: string) => {
	let packageFound = await readPackageUp({ cwd });
	while (packageFound!.packageJson.private) {
		packageFound = await readPackageUp({
			cwd: path.join(path.dirname(packageFound!.path), '..'),
		});
	}
	return packageFound!.packageJson;
};

export const defineArtifact = async (artifactMeta: ArtifactMeta): Promise<Artifact> => {
	const packageName = artifactMeta.package;
	const fullModulePath = path.join(__dirname, 'node_modules', artifactMeta.package, artifactMeta.modulePath);
	const [
		packageJson,
		artifactCode,
	] = await Promise.all([
		readPublicPackageUp(fullModulePath),
		fs.readFile(fullModulePath),
	]);

	assert(packageName === packageJson.name, 'Mismatching package name');

	return {
		packageName,
		packageVersion: packageJson.version,
		modulePath: artifactMeta.modulePath,
		fullModulePath,
		testPath: '',
		artifactCode,
		size: getSize(artifactCode),
		gzipSize: getGzipSize(artifactCode),
	};
};
