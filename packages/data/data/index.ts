import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import { readJsonFile } from '@minification-benchmarks/utils/read-json-file.ts';
import { sortObjectKeys } from '@minification-benchmarks/utils/sort-object-keys.ts';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { BenchmarkResultWithRuns } from '@minification-benchmarks/bench/types.ts';
import type { Data, Artifact } from '../types.ts';
import { sortArtifacts, sortMinifiers } from './sort.ts';

const dataPath = new URL('data.json', import.meta.url).pathname;

export const data = await readJsonFile(dataPath).catch((error: NodeJS.ErrnoException) => {
	if (error.code === 'ENOENT') {
		return {};
	}
	throw error;
}) as Data;

export const saveData = async (
	minifiersSort = false,
) => {
	const sortedData = sortObjectKeys(data, sortArtifacts);

	if (minifiersSort) {
		for (const artifact of Object.values(sortedData)) {
			artifact.minified = sortObjectKeys(artifact.minified, sortMinifiers);
		}
	}

	const temporaryPath = `${dataPath}.${randomUUID()}.tmp`;
	try {
		await fs.writeFile(temporaryPath, `${JSON.stringify(sortedData, null, '\t')}\n`);
		await fs.rename(temporaryPath, dataPath);
	} finally {
		await fs.rm(temporaryPath, { force: true });
	}
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
		foundMinifier
		&& foundMinifier.version === minifier.meta.version
		&& foundMinifier.configHash === minifier.configHash
		&& foundMinifier.node === process.version
		&& !('error' in foundMinifier.result)
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
		configHash: minifier.configHash!,
		node: process.version,
		result,
	};
	foundArtifact.minified = sortObjectKeys(foundArtifact.minified, sortMinifiers);

	await saveData();
};
