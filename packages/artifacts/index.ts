import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
import type { Artifact } from './types';

const require = createRequire(import.meta.url);

const artifactDirectory = new URL('artifacts', import.meta.url).pathname;

export const getArtifacts = async () => {
	let artifactMetas = await fs.readdir(artifactDirectory);

	artifactMetas = artifactMetas.filter(
		fileName => !fileName.startsWith('.'),
	);

	const artifacts: Artifact[] = await Promise.all(artifactMetas.map(
		async (artifactMetaPath) => {
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

export * from './types';