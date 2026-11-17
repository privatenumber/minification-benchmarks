import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
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

test('cache requires the current Node version and a successful result', async () => {
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
		expect(hasResults(artifact, minifier, 'default')).toBe(false);
		cached.result = {
			error: {
				message: 'failed',
				stage: 'minification',
			},
		};
		expect(hasResults(artifact, minifier, 'default')).toBe(false);
		cached.result = {
			data: {
				...successResult.data,
				runs: 2,
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
		`console.log('warning {}'); console.log(JSON.stringify(${JSON.stringify(successResult)})); console.log(JSON.stringify({data:{status:'ready'}})); console.log('null'); console.warn('benign warning')`,
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

test('reports a protocol error when a failing process prints null', async ({ signal }) => {
	const processResult = await runNode(
		'console.error("null"); process.exit(1)',
		signal,
	).catch(error => error as SubprocessError);
	const result = parseBenchmarkProcessResult(processResult);
	expect('error' in result).toBe(true);
	if ('error' in result) {
		expect(result.error.message).toContain('Failed to parse JSON result (exit code: 1');
		expect(result.error.message).toContain('null');
	}
}, 5000);

test('rejects malformed benchmark results', async ({ signal }) => {
	const processResult = await runNode(
		'console.error(\'{"error":{}}\'); process.exit(1)',
		signal,
	).catch(error => error as SubprocessError);
	const result = parseBenchmarkProcessResult(processResult);
	assert.ok('error' in result);
	expect(result.error.message).toContain('Failed to parse JSON result (exit code: 1');
}, 5000);

test('failed processes cannot report success', async ({ signal }) => {
	const processResult = await runNode(
		`console.error(JSON.stringify(${JSON.stringify(successResult)})); process.exit(1)`,
		signal,
	).catch(error => error as SubprocessError);
	const result = parseBenchmarkProcessResult(processResult);
	assert.ok('error' in result);
	expect(result.error.message).toContain('exit code: 1');
}, 5000);

test('rejects mixed results and errors with non-string stages', async ({ signal }) => {
	const processResult = await runNode(
		'console.error(JSON.stringify({error:{message:\'valid\'}})); console.error(JSON.stringify({error:{message:\'bad\',stage:1}})); console.error(JSON.stringify({error:{message:\'bad\'},data:{}})); process.exit(1)',
		signal,
	).catch(error => error as SubprocessError);
	expect(parseBenchmarkProcessResult(processResult)).toStrictEqual({ error: { message: 'valid' } });
}, 5000);

test('reports the cause when a child cannot be spawned', async () => {
	const result = await runBenchmarkProcess('/nonexistent/benchmark-command', [], 1000);
	assert.ok('error' in result);
	expect(result.error.message).toContain('ENOENT');
}, 5000);

test('result lines follow output without a trailing newline', async ({ signal }) => {
	const logPath = new URL('../../benchmark/log.ts', import.meta.url).href;
	const success = await runNode(
		`import { logResult } from ${JSON.stringify(logPath)}; process.stdout.write('warning'); logResult({code:'x',time:1})`,
		signal,
	);
	expect(success.stdout.startsWith('warning\n{')).toBe(true);
	const failure = await runNode(
		`import { logError } from ${JSON.stringify(logPath)}; process.stderr.write('warning'); logError(new Error('failed'))`,
		signal,
	).catch(error => error as SubprocessError);
	expect(failure.stderr.startsWith('warning\n{')).toBe(true);
	expect(parseBenchmarkProcessResult(failure)).toMatchObject({ error: { message: 'failed' } });
}, 5000);

test('cleans up descendants after the group leader exits', async () => {
	const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'benchmark-exit-'));
	const started = path.join(directory, 'started');
	let pid: number | undefined;
	try {
		const parent = `const child = require('child_process').spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], {stdio:'ignore'}); require('fs').writeFileSync(${JSON.stringify(started)}, String(child.pid)); console.error(JSON.stringify({error:{message:'failed'}})); process.exit(1)`;
		const result = await runBenchmarkProcess(process.execPath, ['-e', parent], 2000);
		pid = Number(await fs.readFile(started, 'utf8'));
		expect(result).toStrictEqual({ error: { message: 'failed' } });
		await delay(100);
		assert.throws(() => process.kill(pid!, 0), { code: 'ESRCH' });
	} finally {
		pid ??= Number(await fs.readFile(started, 'utf8').catch(() => '0'));
		if (pid) {
			try {
				process.kill(pid, 'SIGKILL');
			} catch (error) {
				assert.equal((error as NodeJS.ErrnoException).code, 'ESRCH');
			}
		}
		await fs.rm(directory, {
			recursive: true,
			force: true,
		});
	}
}, 5000);

test('timeout does not wait for escaped descendants holding output pipes', async () => {
	const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'benchmark-escaped-'));
	const started = path.join(directory, 'started');
	let pid: number | undefined;
	try {
		const grandchild = 'setInterval(() => {}, 1000)';
		const parent = `const child = require('child_process').spawn(process.execPath, ['-e', ${JSON.stringify(grandchild)}], { detached: true, stdio: ['ignore', 1, 2] }); require('fs').writeFileSync(${JSON.stringify(started)}, String(child.pid)); setInterval(() => {}, 1000)`;
		const start = Date.now();
		const result = await runBenchmarkProcess(process.execPath, ['-e', parent], 700);
		pid = Number(await fs.readFile(started, 'utf8'));
		expect(result).toStrictEqual({ error: { message: 'timeout' } });
		expect(Date.now() - start).toBeLessThan(2000);
	} finally {
		pid ??= Number(await fs.readFile(started, 'utf8').catch(() => '0'));
		if (pid) {
			try {
				process.kill(-pid, 'SIGKILL');
			} catch (error) {
				assert.equal((error as NodeJS.ErrnoException).code, 'ESRCH');
			}
		}
		await fs.rm(directory, {
			recursive: true,
			force: true,
		});
	}
}, 5000);

test('timeout kills descendant processes', async () => {
	const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'benchmark-timeout-'));
	const started = path.join(directory, 'started');
	let pid: number | undefined;
	try {
		const grandchild = `require('fs').writeFileSync(${JSON.stringify(started)}, String(process.pid)); setInterval(() => {}, 1000)`;
		const parent = `require('child_process').spawn(process.execPath, ['-e', ${JSON.stringify(grandchild)}], { stdio: 'ignore' }); setInterval(() => {}, 1000)`;
		const result = await runBenchmarkProcess(process.execPath, ['-e', parent], 700);
		expect(result).toStrictEqual({ error: { message: 'timeout' } });
		pid = Number(await fs.readFile(started, 'utf8'));
		await delay(100);
		assert.throws(() => process.kill(pid!, 0), { code: 'ESRCH' });
	} finally {
		if (pid) {
			try {
				process.kill(pid, 'SIGKILL');
			} catch (error) {
				assert.equal((error as NodeJS.ErrnoException).code, 'ESRCH');
			}
		}
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
