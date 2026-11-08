import fs from 'fs/promises';
import path from 'path';
import { artifactsDirectory } from './artifacts-directory.ts';
import type { ArtifactLoaded } from './artifact.ts';
import type { Test } from './define-test.ts';

export const loadArtifact = async (
	name: string,
) => {
	const artifactModule = await import(path.join(artifactsDirectory, name, 'index.ts')).catch((error) => {
		throw new Error(`Error loading artifact "${name}":\n${
			error instanceof Error
				? error.message
				: JSON.stringify(error, null, '\t')
		}`);
	});

	const artifact = artifactModule.default as ArtifactLoaded;

	const artifactTestPath = path.join(artifactsDirectory, name, 'test.ts');
	await fs.access(artifactTestPath).catch((error: NodeJS.ErrnoException) => {
		if (error.code === 'ENOENT') {
			throw new Error(`Missing test for artifact "${name}": ${artifactTestPath}`);
		}
		throw error;
	});
	artifact.loadTest = () => import(artifactTestPath).then(module => module.default as Test);

	await artifact.load();

	return Object.assign(artifact, { name }) as ArtifactLoaded;
};
