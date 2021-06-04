import path from 'path';
import assert from 'assert';
import { inspect } from 'util';
import execa from 'execa';
import task from 'tasuku';
import byteSize from 'byte-size';
import { getArtifact } from './utils/get-artifact';
import { percent, formatMs } from './utils/formatting';
import { safeJsonParse } from './utils/safe-json-parse';
import { getMinifiers } from './utils/get-minifiers';
import type { Artifact, BenchmarkResult, MinifierBenchmarkResult } from './types';

const benchmark = async (
	minifier: string,
	filePath: string,
): Promise<BenchmarkResult> => {
	const { stdout } = await execa(
		require.resolve('esno/esno'),
		[
			path.join(__dirname, 'benchmark.ts'),
			'--minifier',
			minifier,
			filePath,
		],
		{
			timeout: 1000 * 60,
		},
	);

	return safeJsonParse(stdout);
};

type Tasuku = typeof task;

export async function benchmarkAllMinifiers(
	task: Tasuku,
	artifact: Artifact,
) {
	const minifiers = await getMinifiers();
	return await task.group(
		task => minifiers.map(
			minifier => task(
				minifier,
				async ({
					setStatus,
					setOutput,
					setError,
				}): Promise<MinifierBenchmarkResult> => {
					const result = await benchmark(minifier, artifact.modulePath);

					if (!result) {
						setError(new Error('Failed to minify'));
					} else {
						setStatus(formatMs(result.time));
						setOutput(
							`${byteSize(artifact.size)} → ${byteSize(result.minifiedSize)} (${percent(artifact.size, result.minifiedSize)})`,
						);
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

// If file is called directly
if (require.main === module) {
	(async () => {
		const filePath = process.argv[2];
		assert(filePath?.length, 'File path must be passed in');

		const { result } = await task('Getting artifact', async ({ setTitle, task }) => {
			const artifact = await getArtifact(filePath);
			setTitle(`Artifact: ${artifact.moduleName} v${artifact.moduleVersion} - ${artifact.modulePath}`);

			const { results } = await benchmarkAllMinifiers(task, artifact);
			return results;
		});

		console.log(inspect(result, {
			colors: true,
			depth: null,
		}));
	})().catch(console.error);
}
