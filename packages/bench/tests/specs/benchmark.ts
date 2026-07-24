import { SubprocessError } from 'nano-spawn';
import { expect, test } from 'manten';
import type { BenchmarkResult } from '../../types.ts';
import { parseBenchmarkProcessResult } from '../../benchmark-all/benchmark.ts';
import { runNode } from '../utils/run-node.ts';

const successResult: BenchmarkResult = {
	data: {
		minifiedBytes: 10,
		minzippedBytes: 8,
		time: 1,
	},
};

test('parses stdout when a successful benchmark writes to stderr', async ({ signal }) => {
	const processResult = await runNode(
		`console.log(JSON.stringify(${JSON.stringify(successResult)})); console.warn('benign warning')`,
		signal,
	);

	expect(parseBenchmarkProcessResult(processResult)).toStrictEqual(successResult);
}, 5000);

test('parses stderr when a benchmark process fails', async ({ signal }) => {
	const errorResult: BenchmarkResult = {
		error: {
			message: 'minification failed',
		},
	};
	const processResult = await runNode(
		`console.error(JSON.stringify(${JSON.stringify(errorResult)})); process.exit(1)`,
		signal,
	).catch(error => error as SubprocessError);

	expect(processResult).toBeInstanceOf(SubprocessError);
	expect(parseBenchmarkProcessResult(processResult)).toStrictEqual(errorResult);
}, 5000);
