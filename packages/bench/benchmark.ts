import path from 'path';
import { execa, ExecaError } from 'execa';
import { safeJsonParse } from '@minification-benchmarks/utils/safe-json-parse';
import type { BenchmarkResult } from './types';

const scriptsPath = new URL('../scripts', import.meta.url).pathname;

export const benchmark = async (
	minifier: string,
	artifactPath: string,
	testPath?: string,
	outputPath?: string,
): Promise<BenchmarkResult> => {
	let stdout;
	try {
		const minificationProcess = await execa(
			'tsx',
			[
				path.join(scriptsPath, 'benchmark/index.ts'),
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

		stdout = minificationProcess.stdout;
	} catch (error) {
		if (error instanceof Error) {
			const execaError = error as ExecaError;
			const { stderr } = execaError;
			if (stderr) {
				// script stderr should log { error: string }
				return safeJsonParse(stderr);
			}

			return {
				error: execaError.originalMessage ?? error.message,
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