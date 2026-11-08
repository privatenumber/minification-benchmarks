import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { expect, test } from 'manten';
import { data, hasResults } from '@minification-benchmarks/data';
import { loadArtifact } from '@minification-benchmarks/artifacts';
import { getMinifier } from '@minification-benchmarks/minifiers';
import { Artifact } from '@minification-benchmarks/artifacts/utils/artifact.ts';
import { SubprocessError } from 'nano-spawn';
import type { BenchmarkResult } from '../../types.ts';
import { parseBenchmarkProcessResult, runBenchmarkProcess } from '../../benchmark-all/benchmark.ts';
import { runNode } from '../utils/run-node.ts';

const successResult: BenchmarkResult = {
	data: {
		minifiedBytes: 10,
		minzippedBytes: 8,
		time: 1,
	},
};

test('cache requires the current Node version and a deterministic result', async () => {
	const artifact = await loadArtifact('react');
	const minifier = await getMinifier('esbuild');
	const original = data[artifact.name];
	try {
		data[artifact.name] = {
			version: artifact.packageJson.version!,
			filePath: artifact.filePath,
			size: artifact.size,
			gzipSize: artifact.gzipSize,
			minified: {
				[minifier.name]: {
					minifierPath: minifier.minifierPath!,
					version: minifier.meta.version,
					configHash: minifier.configHash!,
					node: process.version,
					result: { error: { message: 'protocol failure' } },
				},
			},
		};
		const cached = data[artifact.name].minified[minifier.name];
		expect(hasResults(artifact, minifier, 'default')).toBe(false);
		cached.result = { error: { message: 'timeout' } };
		expect(hasResults(artifact, minifier, 'default')).toBe(true);
		cached.result = {
			error: {
				message: 'failed',
				stage: 'minification',
			},
		};
		expect(hasResults(artifact, minifier, 'default')).toBe(true);
		cached.node = 'v0.0.0';
		expect(hasResults(artifact, minifier, 'default')).toBe(false);
		cached.node = undefined as unknown as string;
		expect(hasResults(artifact, minifier, 'default')).toBe(false);
	} finally {
		if (original) {
			data[artifact.name] = original;
		} else {
			delete data[artifact.name];
		}
	}
}, 5000);

test('validates an empty string rather than substituting original code', async () => {
	const artifact = new Artifact({
		package: 'example',
		filePath: 'index.js',
	});
	artifact.code = 'module.exports = 1';
	let testedCode: string | undefined;
	artifact.loadTest = async () => ({
		preprocess: (code) => {
			testedCode = code;
			return code;
		},
		run: () => {},
	});
	await artifact.validate('');
	expect(testedCode).toBe('');
}, 5000);

test('parses stdout when a successful benchmark writes to stderr', async ({ signal }) => {
	const processResult = await runNode(
		`console.log('warning {}'); console.log(JSON.stringify(${JSON.stringify(successResult)})); console.warn('benign warning')`,
		signal,
	);

	expect(parseBenchmarkProcessResult(processResult)).toStrictEqual(successResult);
}, 5000);

test('reports process details when output has no JSON result', async ({ signal }) => {
	const processResult = await runNode(
		'console.log(\'stdout tail\'); console.error(\'stderr tail\'); process.exit(7)',
		signal,
	).catch(error => error as SubprocessError);
	const result = parseBenchmarkProcessResult(processResult);
	expect('error' in result).toBe(true);
	if ('error' in result) {
		expect(result.error.message.includes('exit code: 7')).toBe(true);
		expect(result.error.message.includes('signal: undefined')).toBe(true);
		expect(result.error.message.includes('stdout tail')).toBe(true);
		expect(result.error.message.includes('stderr tail')).toBe(true);
	}
}, 5000);

test('timeout kills descendant processes', async () => {
	const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'benchmark-timeout-'));
	const started = path.join(directory, 'started');
	const survived = path.join(directory, 'survived');
	try {
		const grandchild = `require('fs').writeFileSync(${JSON.stringify(started)}, ''); setTimeout(() => require('fs').writeFileSync(${JSON.stringify(survived)}, ''), 1500)`;
		const parent = `require('child_process').spawn(process.execPath, ['-e', ${JSON.stringify(grandchild)}], { stdio: 'ignore' }); setInterval(() => {}, 1000)`;
		const result = await runBenchmarkProcess(process.execPath, ['-e', parent], 700);
		expect(result).toStrictEqual({ error: { message: 'timeout' } });
		await fs.access(started);
		await delay(1200);
		expect(await fs.access(survived).then(() => true, () => false)).toBe(false);
	} finally {
		await fs.rm(directory, {
			recursive: true,
			force: true,
		});
	}
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
