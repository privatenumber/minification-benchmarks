import fs from 'fs/promises';
import { readJsonFile } from '@minification-benchmarks/utils/read-json-file.js';
import { sortObjectKeys } from '@minification-benchmarks/utils/sort-object-keys.js';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { BenchmarkResultWithRuns } from '@minification-benchmarks/bench/types.js';
import type { Data, Artifact } from './types.js';

const dataPath = new URL('data.json', import.meta.url).pathname;

export const data = await readJsonFile(dataPath) as Data;

export const saveData = async () => {
	const sortedData = sortObjectKeys(data, ([, a], [, b]) => a.size - b.size);
	await fs.writeFile(dataPath, JSON.stringify(sortedData, null, '\t'));
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
	result: BenchmarkResultWithRuns,
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

	const minifierName = getMinifierName(minifier, minifierInstance);
	foundArtifact.minified[minifierName] = {
		minifierPath: minifier.minifierPath!,
		version: minifier.meta.version,
		result,
	};
	foundArtifact.minified = sortObjectKeys(
		foundArtifact.minified,
		([, a], [, b]) => {
			if ('error' in a.result) { return 1; }
			if ('error' in b.result) { return -1; }
			return a.result.data.minzippedSize - b.result.data.minzippedSize;
		},
	);

	await saveData();
};
