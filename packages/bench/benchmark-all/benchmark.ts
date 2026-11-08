import spawn, { SubprocessError, type Result } from 'nano-spawn';
import { parseJsonResult } from '@minification-benchmarks/utils/parse-json-result.ts';
import type {
	BenchmarkResult,
	BenchmarkResultSuccess,
	BenchmarkResultWithRuns,
} from '../types.ts';

const benchmarkCliPath = new URL('../benchmark/cli.ts', import.meta.url).pathname;

export const parseBenchmarkProcessResult = (
	minificationProcess: Result | SubprocessError,
): BenchmarkResult => {
	try {
		return parseJsonResult(
			minificationProcess instanceof SubprocessError
				? minificationProcess.stderr
				: minificationProcess.stdout,
		) as BenchmarkResult;
	} catch {
		const tail = (output: string) => output.split(/\r?\n/).slice(-20).join('\n');
		const exitCode = minificationProcess instanceof SubprocessError
			? minificationProcess.exitCode
			: 0;
		const signal = minificationProcess instanceof SubprocessError
			? minificationProcess.signalName
			: undefined;
		return {
			error: {
				message: `Failed to parse JSON result (exit code: ${exitCode}, signal: ${signal})\nstdout tail:\n${tail(minificationProcess.stdout)}\nstderr tail:\n${tail(minificationProcess.stderr)}`,
			},
		};
	}
};

export const runBenchmarkProcess = async (
	file: string,
	args: string[],
	timeout: number,
): Promise<BenchmarkResult> => {
	const subprocess = spawn(file, args, {
		detached: true,
		env: { NO_COLOR: '1' },
	});
	const resultPromise = subprocess.catch(error => error as SubprocessError);
	const child = await subprocess.nodeChildProcess.catch(() => undefined);
	if (!child) {
		return parseBenchmarkProcessResult(await resultPromise);
	}
	let timedOut = false;
	let timer: NodeJS.Timeout;
	const timeoutFailure = new Promise<never>((_resolve, reject) => {
		timer = setTimeout(() => {
			timedOut = true;
			try {
				process.kill(-child.pid!, 'SIGKILL');
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code !== 'ESRCH') {
					reject(error);
				}
			}
		}, timeout);
	});
	try {
		const result = await Promise.race([resultPromise, timeoutFailure]);
		if (timedOut) {
			return { error: { message: 'timeout' } };
		}
		return parseBenchmarkProcessResult(result);
	} finally {
		clearTimeout(timer!);
	}
};

const benchmark = async (
	artifact: string,
	minifier: string,
	minifierInstance: string | undefined,
	timeout = 1000 * 10,
): Promise<BenchmarkResult> => runBenchmarkProcess(
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
	timeout,
);

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
