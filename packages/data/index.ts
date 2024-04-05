import fs from 'fs/promises';
import { readJsonFile } from '@minification-benchmarks/utils/read-json-file.js';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';

import type { Data, Artifact } from './types.js';

const dataPath = new URL('data.json', import.meta.url).pathname;

export const getData = async () => await readJsonFile(dataPath) as Data;

const data = await getData();

export const saveData = async () => {
	await fs.writeFile(dataPath, JSON.stringify(data, null, '\t'));
};

const getArtifact = (
	artifact: ArtifactLoaded,
): Artifact | false => {
	const foundArtifact = data[artifact.name];
	const hasArtifact = (
		foundArtifact?.version === artifact.packageJson.version
		&& foundArtifact?.filePath === artifact.filePath
	);

	return hasArtifact && foundArtifact;
};

const getMinifierName = (
	minifier: MinifierLoaded,
	minifierInstance: string,
) => minifier.name + (minifierInstance === 'default' ? '' : ` (${minifierInstance})`);

const getMinifier = (
	artifact: Artifact,
	minifier: MinifierLoaded,
	minifierInstance: string,
) => {
	const minifierName = getMinifierName(minifier, minifierInstance);
	const foundMinifier = artifact.minified[minifierName];
	return (
		foundMinifier?.version === minifier.meta.version
		&& foundMinifier
	);
};

export const hasResults = (
	artifact: ArtifactLoaded,
	minifier: MinifierLoaded,
	minifierInstance: string,
) => {
	const foundArtifact = getArtifact(artifact);
	if (!foundArtifact) {
		return false;
	}

	return Boolean(getMinifier(foundArtifact, minifier, minifierInstance));
};

export const saveResults = async (
	artifact: ArtifactLoaded,
	minifier: MinifierLoaded,
	minifierInstance: string,
	result: any,
) => {
	let foundArtifact = getArtifact(artifact);

	if (!foundArtifact) {
		foundArtifact = {
			version: artifact.packageJson.version,
			filePath: artifact.filePath,
			size: artifact.size,
			gzipSize: artifact.gzipSize,
			minified: {},
		};
		data[artifact.name] = foundArtifact;
	}

	let foundMinifier = getMinifier(foundArtifact, minifier, minifierInstance);
	if (!foundMinifier) {
		const minifierName = getMinifierName(minifier, minifierInstance);
		foundMinifier = {
			version: minifier.meta.version,
			result,
		};
		foundArtifact.minified[minifierName] = foundMinifier;
	}

	await saveData();
};
