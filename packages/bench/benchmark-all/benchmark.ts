import spawn, { type SubprocessError } from 'nano-spawn';
import { parseJsonResult } from '@minification-benchmarks/utils/parse-json-result.js';
import type {
	BenchmarkResult,
	BenchmarkResultSuccess,
	BenchmarkResultWithRuns,
} from '../types.js';

const benchmarkCliPath = new URL('../benchmark/cli.ts', import.meta.url).pathname;

const benchmark = async (
	artifact: string,
	minifier: string,
	minifierInstance: string | undefined,
	timeout = 1000 * 10,
): Promise<BenchmarkResult> => {
	const minificationProcess = await spawn(
		process.execPath,
		[
			...process.execArgv,
			benchmarkCliPath,
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
			env: {
				NO_COLOR: '1',
			},
		},
	).catch(error => error as SubprocessError);

	if ('signalName' in minificationProcess && minificationProcess.signalName === 'SIGTERM') {
		return {
			error: {
				message: 'timeout',
			},
		};
	}

	if (minificationProcess.stderr) {
		return parseJsonResult(minificationProcess.stderr) as BenchmarkResult;
	}

	return parseJsonResult(minificationProcess.stdout) as BenchmarkResult;
};

const getAverage = (
	numbers: number[],
) => (
	numbers.reduce(
		(sum, next) => sum + next,
		0,
	) / numbers.length
);

const byteFormatter = new Intl.NumberFormat('en', {
	notation: 'compact',
	compactDisplay: 'short',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const formatTime = (ms: number) => {
	if (ms < 1000) {
		return `${Math.round(ms)}ms`;
	}
	return `${(ms / 1000).toFixed(1)}s`;
};

export const benchmarkAverage = async (
	artifact: string,
	minifier: string,
	minifierInstance: string | undefined,
	sampleSize: number,
	setStatus: (status: string) => void,
): Promise<BenchmarkResultWithRuns> => {
	const results: BenchmarkResultSuccess[] = [];
	for (let i = 0; i < sampleSize; i += 1) {
		setStatus(`${i + 1}/${sampleSize}`);
		const result = await benchmark(
			artifact,
			minifier,
			minifierInstance,
		);

		if (!result) {
			setStatus(`${i + 1}/${sampleSize} — No result`);
			return {
				error: {
					message: 'No result',
				},
			};
		}

		if ('error' in result) {
			setStatus(`${i + 1}/${sampleSize} — ${result.error.message}`);
			return result;
		}

		results.push(result);

		const avgTime = getAverage(results.map(r => r.data.time));
		setStatus(`${byteFormatter.format(result.data.minifiedBytes)} → ${byteFormatter.format(result.data.minzippedBytes)} gzip, ${formatTime(avgTime)}`);
	}

	return {
		data: {
			...results[0].data,
			time: getAverage(results.map(({ data: result }) => result.time)),
			runs: sampleSize,
		},
	};
};
