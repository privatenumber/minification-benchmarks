import { execaNode } from 'execa';
import { safeJsonParse } from '@minification-benchmarks/utils/safe-json-parse';
import type { BenchmarkResult } from '../types';

const benchmarkCliPath = new URL('../benchmark-cli.ts', import.meta.url).pathname;

export const benchmark = async (
	artifact: string,
	minifier: string,
	minifierInstance: string,
	outputPath?: string,
	timeout = 1000 * 20,
): Promise<BenchmarkResult> => {
	const minificationProcess = await execaNode(
		benchmarkCliPath,
		[
			'--artifact',
			artifact,

			'--minifier',
			minifier,

			'--instance',
			minifierInstance,

			...(
				outputPath
					? [
						'--output-path',
						outputPath,
					]
					: []
			),
		],
		{
			timeout,
			reject: false,
		},
	);

	if (minificationProcess.failed) {
		return safeJsonParse(minificationProcess.stderr);
	}

	return safeJsonParse(minificationProcess.stdout);
};