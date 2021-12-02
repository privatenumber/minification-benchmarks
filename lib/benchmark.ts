import path from 'path';
import execa, { ExecaError } from 'execa';
import { safeJsonParse } from './utils/safe-json-parse';
import type { BenchmarkResult } from './types';

export const benchmark = async (
	minifier: string,
	artifactPath: string,
	testPath?: string,
	outputPath?: string,
): Promise<BenchmarkResult> => {
	let stdout;
	try {
		const minificationProcess = await execa(
			require.resolve('esno/esno'),
			[
				path.join(__dirname, '../scripts/benchmark/index.ts'),
				'--minifier',
				minifier,
				artifactPath,
				...(
					outputPath
						? [
							'--output-path',
							outputPath,
						]
						: []
				),
				...(
					testPath
						? [
							'--test-path',
							testPath,
						]
						: []
				),
			],
			{
				timeout: 1000 * 20,
			},
		);

		const { stderr } = minificationProcess;
		if (stderr) {
			const error = safeJsonParse(stderr);

			console.log({stderr});

			return { error };
		}

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
