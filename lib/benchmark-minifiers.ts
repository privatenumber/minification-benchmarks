import path from 'path';
import byteSize from 'byte-size';
import makeDir from 'make-dir';
import type { Task } from 'tasuku';
import { percent, formatMs } from '@minification-benchmarks/utils/formatting';
import type { Artifact } from '@minification-benchmarks/artifacts';
import type {
	MinifierResult,
	BenchmarkData,
} from './types';
import { benchmark } from './benchmark';

const getAverage = (numbers: number[]) => (
	numbers.reduce(
		(sum, next) => sum + next,
		0,
	) / numbers.length
);

const benchmarkTime = Date.now();

export async function benchmarkMinifiers(
	task: Task,
	minifiers: string[],
	artifact: Artifact,
	sampleSize = 1,
	saveToDirectory = `results/benchmarks-${benchmarkTime}`,
) {
	await makeDir(saveToDirectory);

	return await task.group(
		task => minifiers.map(
			minifierName => task(
				minifierName,
				async ({
					setStatus,
					setOutput,
					setError,
				}): Promise<MinifierResult> => {
					const runs: BenchmarkData[] = [];
					let averageTime = 0;

					for (let i = 1; i <= sampleSize; i += 1) {
						const outputPath = path.resolve(saveToDirectory, `${artifact.packageName}-${minifierName}.js`);
						const result = await benchmark(
							minifierName,
							artifact.fullModulePath,
							artifact.testPath,
							outputPath,
						);

						if ('error' in result) {
							setError(result.error);
							return {
								name: minifierName,
								error: result.error,
							};
						}

						runs.push(result.data);

						setOutput(
							`${byteSize(artifact.size)} → ${byteSize(result.data.minifiedSize)} (${percent(artifact.size, result.data.minifiedSize)})`,
						);

						averageTime = getAverage(runs.map(({ time }) => time));
						setStatus(`Average speed: ${formatMs(averageTime)} / ${runs.length} runs`);
					}

					const [firstRun] = runs;
					const raw = {
						minifiedSize: firstRun.minifiedSize,
						minzippedSize: firstRun.minzippedSize,
						averageTime,
					};
					const formatted = {
						minifiedSize: byteSize(raw.minifiedSize).toString(),
						minzippedSize: byteSize(raw.minzippedSize).toString(),
						averageTime: formatMs(raw.averageTime),
					};

					return {
						name: minifierName,
						data: {
							raw,
							formatted,
						},
						runs,
					};
				},
			),
		),
	);
}
