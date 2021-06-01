import task from 'tasuku';
import { benchmarkAllMinifiers } from '../benchmark-all-minifiers';
import { getArtifact } from '../utils/get-artifact';
import type {
	Artifact,
	ArtifactsMinifierBenchmarks,
	MinifierBenchmarkResult,
} from '../types';
import { getBenchmarkDataTables, updateReadmeMd } from './update-readme';
import artifactPaths from './artifact-paths';

const getArtifacts = async () => {
	const artifacts = await Promise.all(artifactPaths.map(
		async filePath => await getArtifact(filePath),
	));

	artifacts.sort(
		(a, b) => a.moduleName.localeCompare(b.moduleName),
	);

	return artifacts;
};

function recordData(
	data: ArtifactsMinifierBenchmarks,
	artifact: Artifact,
	results: MinifierBenchmarkResult[],
) {
	for (const { minifier, result } of results) {
		if (!data[artifact.moduleName]) {
			data[artifact.moduleName] = {
				artifact,
				results: {},
			};
		}

		if (!data[artifact.moduleName].results[minifier]) {
			data[artifact.moduleName].results[minifier] = [];
		}

		data[artifact.moduleName].results[minifier].push(result);
	}
}

(async () => {
	const artifacts = await getArtifacts();
	const sampleSize = 10;
	const artifactMinifierBenchmarks: ArtifactsMinifierBenchmarks = {};

	await task.group(task => [
		task('Benchmarking', async ({ task, setTitle }) => {
			for (let i = 1; i <= sampleSize; i += 1) {
				setTitle(`Benchmarking #${i}`);

				const benchmarkArtifacts = await task.group(
					task => artifacts.map(
						artifact => task(artifact.moduleName, async ({ task }) => {
							const benchmarkMinifiers = await benchmarkAllMinifiers(
								task,
								artifact,
							);
							benchmarkMinifiers.clear();
							recordData(artifactMinifierBenchmarks, artifact, benchmarkMinifiers.results);
						}),
					),
					{ concurrency: 1 },
				);

				benchmarkArtifacts.clear();
			}
		}),
		task('Update README.md', async () => {
			const benchmarkDataTables = getBenchmarkDataTables(Object.values(artifactMinifierBenchmarks));
			await updateReadmeMd(benchmarkDataTables);
		}),
	], { concurrency: 1 });
})().catch(console.error);
