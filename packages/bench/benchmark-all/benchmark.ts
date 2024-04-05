import path from 'path';
import { execaNode } from 'execa';
import { safeJsonParse } from '@minification-benchmarks/utils/safe-json-parse';
import type { BenchmarkResult, BenchmarkResultSuccess } from '../types.js';

const benchmarkCliPath = new URL('../benchmark/cli.ts', import.meta.url).pathname;

const benchmark = async (
	artifact: string,
	minifier: string,
	minifierInstance: string | undefined,
	timeout = 1000 * 20,
): Promise<BenchmarkResult> => {
	const minificationProcess = await execaNode(
		benchmarkCliPath,
		[
			'--artifact',
			artifact,

			'--minifier',
			minifier,

			// e.g. "no-compress"
			...(
				minifierInstance
					? [
						'--instance',
						minifierInstance,
					]
					: []
			),
		],
		{
			timeout,
			reject: false,
			env: {
				NO_COLOR: '1',
			},
		},
	);

	if (minificationProcess.timedOut) {
		return {
			error: {
				message: 'Timed out',
			},
		};
	}

	if (minificationProcess.failed) {
		return safeJsonParse(minificationProcess.stderr) as BenchmarkResult;
	}

	return safeJsonParse(minificationProcess.stdout) as BenchmarkResult;
};

const getAverage = (
	numbers: number[],
) => (
	numbers.reduce(
		(sum, next) => sum + next,
		0,
	) / numbers.length
);

export const benchmarkAverage = async (
	artifact: string,
	minifier: string,
	minifierInstance: string | undefined,
	sampleSize: number,
): Promise<BenchmarkResult> => {
	const results: BenchmarkResultSuccess[] = [];
	for (let i = 0; i < sampleSize; i += 1) {
		const result = await benchmark(
			artifact,
			minifier,
			minifierInstance,
		);

		if ('error' in result) {
			return result;
		}

		results.push(result);
	}

	return {
		result: {
			...results[0].result,
			time: getAverage(results.map(({ result }) => result.time)),
			runs: sampleSize,
		},
	};
};
