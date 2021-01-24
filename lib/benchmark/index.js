import assert from 'assert';
import path from 'path';
import fs from 'fs';
import execa from 'execa';
import Listr from 'listr';
import byteSize from 'byte-size';
import { getSize, getGzipSize } from '../utils.js';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function benchmark({
	minifier,
	filePath,
	sampleSize,
	onIterationStart,
}) {
	const results = [];

	for (let i = 0; i < sampleSize; i += 1) {
		onIterationStart(i + 1, results[i - 1]);
		const subprocess = execa(process.execPath, [path.join(`./lib/benchmark/minifiers/${minifier}`), filePath], {
			timeout: 1000 * 60,
		});

		subprocess.stdout.pipe(fs.createWriteStream(`logs/${Date.now()}-${minifier}-${path.basename(filePath, '.js')}.log`));

		let jsonData;
		try {
			const result = await subprocess;
			jsonData = JSON.parse(result.stdout);
		} catch (error) {
			console.log(error);
			if (error.message.match('Command timed out')) {
				console.log('Retrying...');
				i -= 1; // Retry
				continue;
			}
			throw error;
		}
		if (results.length > 0) {
			assert(jsonData.size === results[0].size, 'Mismatching size');
		}
		results.push(jsonData);
	}

	// eslint-disable-next-line unicorn/no-reduce
	const avgSpeed = results.reduce((current, next) => current + next.ms, 0) / results.length;

	return {
		ms: avgSpeed,
		size: results[0].size,
		gzipSize: results[0].gzipSize,
	};
}

const sampleSize = 10;

const benchmarkTask = {
	title: 'Benchmarking',
	task(context) {
		context.results = {};
		return new Listr(
			context.artifacts.map(({
				moduleName, version, modulePath, code,
			}) => ({
				title: `Minifying: ${moduleName} (v${version})`,
				task(_, task) {
					const size = getSize(code);
					const gzipSize = getGzipSize(code);
					context.results[moduleName] = {
						size,
						gzipSize,
						benchmarks: {},
					};
					task.output = `${byteSize(size)} (${byteSize(gzipSize)} gzipped)`;
					return new Listr(
						[
							'babel-minify',
							'esbuild',
							'google-closure-compiler.simple',
							'google-closure-compiler.advanced',
							'terser',
							'terser.no-compress',
							'uglify-js',
							'uglify-js.no-compress',
						].map(minifier => ({
							title: minifier,
							async task(__, task2) {
								const benchmarked = await benchmark({
									minifier,
									filePath: modulePath,
									sampleSize,
									onIterationStart(iteration, lastBenchmark) {
										task2.title = `${minifier} [${iteration}/${sampleSize}]`;
										if (lastBenchmark) {
											task2.output = `Last benchmark: ${lastBenchmark.ms.toLocaleString()}ms`;
										}
									},
								}).catch(() => ({}));
								context.results[moduleName].benchmarks[minifier] = benchmarked;
							},
						})),
					);
				},
			})),
		);
	},
};

export default benchmarkTask;
