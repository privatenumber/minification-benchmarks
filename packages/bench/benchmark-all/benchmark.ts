import spawn, { SubprocessError, type Result } from 'nano-spawn';
import { parseJsonResult } from '@minification-benchmarks/utils/parse-json-result.ts';
import type {
	BenchmarkResult,
	BenchmarkResultSuccess,
	BenchmarkResultWithRuns,
} from '../types.ts';

const benchmarkCliPath = new URL('../benchmark/cli.ts', import.meta.url).pathname;
const activeProcesses = new Set<number>();

process.on('exit', () => {
	for (const pid of activeProcesses) {
		try {
			process.kill(-pid, 'SIGKILL');
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'ESRCH') {
				throw error;
			}
		}
	}
});
process.on('SIGINT', () => process.exit(130));
process.on('SIGTERM', () => process.exit(143));

const isBenchmarkResult = (value: unknown): value is BenchmarkResult => {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if ('error' in value) {
		return value.error !== null && typeof value.error === 'object'
			&& 'message' in value.error && typeof value.error.message === 'string';
	}
	if (!('data' in value) || value.data === null || typeof value.data !== 'object') {
		return false;
	}
	const data = value.data as Record<string, unknown>;
	return [data.minifiedBytes, data.minzippedBytes, data.time]
		.every(number => typeof number === 'number' && Number.isFinite(number));
};

export const parseBenchmarkProcessResult = (
	minificationProcess: Result | SubprocessError,
): BenchmarkResult => {
	try {
		return parseJsonResult(
			minificationProcess instanceof SubprocessError
				? minificationProcess.stderr
				: minificationProcess.stdout,
			isBenchmarkResult,
		);
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
	const pid = child.pid!;
	activeProcesses.add(pid);
	resultPromise.then(() => activeProcesses.delete(pid), () => activeProcesses.delete(pid));
	resultPromise.catch(() => {});
	let timer: NodeJS.Timeout;
	const timeoutResult = new Promise<BenchmarkResult>((resolve, reject) => {
		timer = setTimeout(() => {
			try {
				process.kill(-pid, 'SIGKILL');
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code !== 'ESRCH') {
					reject(error);
					return;
				}
			}
			resolve({ error: { message: 'timeout' } });
		}, timeout);
	});
	try {
		return await Promise.race([resultPromise.then(parseBenchmarkProcessResult), timeoutResult]);
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
