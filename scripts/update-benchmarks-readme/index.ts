import task from 'tasuku';
import { getArtifacts } from '../../lib/utils/get-artifacts';
import { getMinifiers } from '../../lib/utils/get-minifiers';
import { benchmarkArtifacts } from '../../lib/benchmark-artifacts';
import type { BenchmarkedArtifact } from '../../lib/types';
import { getBenchmarkDataTables, updateReadmeMd } from './update-readme';

(async () => {
	const minifiers = await getMinifiers();
	const artifacts = await getArtifacts();
	const sampleSize = 5;
	let report: BenchmarkedArtifact[];

	await task.group(task => [
		task(`Benchmarking with sample size ${sampleSize}`, async ({ task }) => {
			const benchmarks = await benchmarkArtifacts(task, artifacts, minifiers, sampleSize);
			report = benchmarks.results;
		}),
		task('Update README.md', async () => {
			const benchmarkDataTables = getBenchmarkDataTables(report);
			await updateReadmeMd(benchmarkDataTables);
		}),
	], { concurrency: 1 });
})().catch(console.error);
