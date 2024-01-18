import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
import type { Artifact } from './types';
import { artifactsDirectory } from './utils/artifacts-directory.js';

const require = createRequire(import.meta.url);

export const getArtifacts = async () => {
	let artifactMetas = await fs.readdir(artifactsDirectory);

	artifactMetas = artifactMetas.filter(
		fileName => !fileName.startsWith('.'),
	);

	const artifacts: Artifact[] = await Promise.all(artifactMetas.map(
		async (artifactMetaPath) => {
			const artifact = await require(path.join(artifactsDirectory, artifactMetaPath)).default;
			artifact.testPath = path.join(artifactsDirectory, artifactMetaPath, 'test.ts');
			return artifact;
		},
	));

	artifacts.sort(
		(a, b) => a.size - b.size,
	);

	return artifacts;
};

export * from './types';
export * from './utils/load-artifact';
