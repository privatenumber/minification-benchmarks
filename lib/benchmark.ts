import path from 'path';
import execa, { ExecaError } from 'execa';
import { safeJsonParse } from './utils/safe-json-parse';
import type { BenchmarkResult } from './types';

export const benchmark = async (
	minifier: string,
	artifactPath: string,
	smokeTestPath?: string,
	outputPath?: string,
): Promise<BenchmarkResult> => {
	let stdout;
	try {
		const minificationProcess = await execa(
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
							smokeTestPath,
						]
						: []
				),
			],
			{
				timeout: 1000 * 20,
			},
		);

		stdout = minificationProcess.stdout;
	} catch (error) {
		if (error instanceof Error) {
			return {
				error: (error as ExecaError).originalMessage ?? error.message,
			};
		}
	}

	if (!stdout) {
		return {
			error: 'Failed to minify',
		};
	}

	const data = safeJsonParse(stdout);
	return { data };
};
