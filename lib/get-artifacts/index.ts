import fs from 'fs/promises';
import path from 'path';
import assert from 'assert';
import { readPackageUpAsync } from 'read-pkg-up';
import type { Artifact, ArtifactMeta } from '../types';
import { getSize, getGzipSize } from '../utils/get-size';

const readPublicPackageUp = async (cwd: string) => {
	let packageFound = await readPackageUpAsync({ cwd });
	while (packageFound!.packageJson.private) {
		packageFound = await readPackageUpAsync({
			cwd: path.join(path.dirname(packageFound!.path), '..'),
		});
	}
	return packageFound!.packageJson;
};

export const defineArtifact = async (artifactMeta: ArtifactMeta): Promise<Artifact> => {
	const packageName = artifactMeta.package;
	const fullModulePath = path.join('node_modules', artifactMeta.package, artifactMeta.modulePath);
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

type Test = {
	preprocess?: (code: string) => string;
	run: (exports: any) => void;
};
export const defineTest = (test: Test) => test;

const artifactDirectory = path.join(__dirname, './artifacts');

export const getArtifacts = async () => {
	const artifactMetas = (await fs.readdir(artifactDirectory)).filter(
		fileName => !fileName.startsWith('.'),
	);

	const artifacts: Artifact[] = await Promise.all(artifactMetas.map(
		async (artifactMetaPath) => {
			// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
			const artifact = await require(path.join(artifactDirectory, artifactMetaPath)).default;
			artifact.testPath = path.join(artifactDirectory, artifactMetaPath, 'test.ts');
			return artifact;
		},
	));

	artifacts.sort(
		(a, b) => a.size - b.size,
	);

	return artifacts;
};
