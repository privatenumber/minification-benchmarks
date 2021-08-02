import task from 'tasuku';
import { getArtifacts } from '../../lib/utils/get-artifacts';
import { getMinifiers } from '../../lib/utils/get-minifiers';
import { benchmarkArtifacts } from '../../lib/benchmark-artifacts';
import type { ArtifactsMinifierBenchmarks } from '../../lib/types';
import { getBenchmarkDataTables, updateReadmeMd } from './update-readme';

(async () => {
	const minifiers = await getMinifiers();
	const artifacts = await getArtifacts();
	const sampleSize = 5;
	const artifactMinifierBenchmarks: ArtifactsMinifierBenchmarks = {};

	await task.group(task => [
		task('Benchmarking', async ({ task, setTitle }) => {
			for (let i = 1; i <= sampleSize; i += 1) {
				setTitle(`Benchmarking #${i}`);

				const benchmarking = await benchmarkArtifacts(task, artifacts, minifiers);

				for (const { artifact, minifierResults } of benchmarking.results) {
					if (!artifactMinifierBenchmarks[artifact.moduleName]) {
						artifactMinifierBenchmarks[artifact.moduleName] = {
							artifact,
							results: {},
						};
					}

					for (const { minifier, result } of minifierResults) {
						if (!artifactMinifierBenchmarks[artifact.moduleName].results[minifier]) {
							artifactMinifierBenchmarks[artifact.moduleName].results[minifier] = [];
						}

						artifactMinifierBenchmarks[artifact.moduleName].results[minifier].push(result);
					}
				}

				benchmarking.clear();
			}
		}),
		task('Update README.md', async () => {
			const benchmarkDataTables = getBenchmarkDataTables(Object.values(artifactMinifierBenchmarks));
			await updateReadmeMd(benchmarkDataTables);
		}),
	], { concurrency: 1 });
})().catch(console.error);
