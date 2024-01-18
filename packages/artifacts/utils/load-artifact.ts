import fs from 'fs/promises';
import path from 'path';
import { artifactsDirectory } from './artifacts-directory.js';
import type { Artifact } from './artifact.js';
import type { Test } from './define-test.js';

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

	const artifact = artifactModule.default as Artifact;

	const artifactTestPath = path.join(artifactsDirectory, name, 'test.ts');
	const testExists = await fs.access(artifactTestPath).then(() => true, () => false);
	if (testExists) {
		artifact.loadTest = () => import(artifactTestPath).then(module => module.default as Test);
	}

	await artifact.load();
	return artifact;
};
