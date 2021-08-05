import path from 'path';
import task from 'tasuku';
import byteSize from 'byte-size';
import makeDir from 'make-dir';
import { percent, formatMs } from './utils/formatting';
import type { Artifact, MinifierBenchmarkResult } from './types';
import { benchmark } from './benchmark';

type Tasuku = typeof task;

const benchmarkTime = Date.now();

export async function benchmarkMinifiers(
	task: Tasuku,
	minifiers: string[],
	artifact: Artifact,
) {
	const directoryName = `results/benchmarks-${benchmarkTime}`;
	await makeDir(directoryName);

	return await task.group(
		task => minifiers.map(
			minifier => task(
				minifier,
				async ({
					setStatus,
					setOutput,
					setError,
				}): Promise<MinifierBenchmarkResult> => {
					const artifactFileName = path.basename(artifact.modulePath, '.js');
					const outputPath = path.join(directoryName, `${artifactFileName}--${minifier}.js`);

					let result;
					try {
						result = await benchmark(
							minifier,
							artifact.modulePath,
							artifact.artifactFilePath,
							outputPath,
						);

						if (!result) {
							setError(new Error('Failed to minify'));
						} else {
							setStatus(formatMs(result.time));
							setOutput(
								`${byteSize(artifact.size)} → ${byteSize(result.minifiedSize)} (${percent(artifact.size, result.minifiedSize)})`,
							);
						}
					} catch (error) {
						setError(error);
					}

					return {
						minifier,
						result,
					};
				},
			),
		),
	);
}
