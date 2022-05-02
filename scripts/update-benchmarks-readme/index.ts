import fs from 'fs/promises';
import path from 'path';
import task from 'tasuku';
import makeDir from 'make-dir';
import { getArtifacts } from '../../lib/get-artifacts';
import { getMinifiers } from '../../lib/utils/get-minifiers';
import { benchmarkArtifacts } from '../../lib/benchmark-artifacts';
import type { BenchmarkedArtifact } from '../../lib/types';
import { getBenchmarkDataTables, updateReadmeMd } from './update-readme';

(async () => {
	const benchmarkTime = Date.now();
	const saveToDirectory = `results/benchmarks-${benchmarkTime}`;
	const minifiers = await getMinifiers();
	const artifacts = await getArtifacts();
	const sampleSize = 5;
	let report: BenchmarkedArtifact[];

	await task.group(task => [
		task('Benchmarking', async ({ task, setStatus }) => {
			setStatus(`Sample size: ${sampleSize}`);
			const benchmarks = await benchmarkArtifacts(
				task,
				artifacts,
				minifiers,
				sampleSize,
				saveToDirectory,
			);

			report = benchmarks.map(task => task.result);
		}),
		task('Update README.md', async () => {
			const reportStringified = JSON.stringify(
				report,
				(key, value) => {
					if (key === 'artifactCode') {
						return undefined;
					}

					return value;
				},
				'\t',
			);

			await makeDir(saveToDirectory);
			await fs.writeFile(path.join(saveToDirectory, 'report.json'), reportStringified);

			const benchmarkDataTables = getBenchmarkDataTables(report);
			await updateReadmeMd(benchmarkDataTables);
		}),
	], { concurrency: 1 });
})().catch(console.error);
