import path from 'path';
import execa from 'execa';
import { safeJsonParse } from './utils/safe-json-parse';
import type { BenchmarkResult } from './types';

export const benchmark = async (
	minifier: string,
	artifactPath: string,
	smokeTestPath?: string,
	outputPath?: string,
): Promise<BenchmarkResult> => {
	const { stdout } = await execa(
		require.resolve('esno/esno'),
		[
			path.join(__dirname, '../scripts/benchmark.ts'),
			'--minifier',
			minifier,
			artifactPath,
			...(
				outputPath
					? [
						'--outputPath',
						outputPath,
					]
					: []
			),
			...(
				smokeTestPath
					? [
						'--smokeTestPath',
						smokeTestPath
					]
					: []
			)
		],
		{
			timeout: 1000 * 60,
		},
	);

	return safeJsonParse(stdout);
};
