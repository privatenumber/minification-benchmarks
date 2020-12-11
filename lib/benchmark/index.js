import assert from 'assert';
import execa from 'execa';
import Listr from 'listr';
import path from 'path';
// import { promisify } from 'util';
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
		const spawned = await execa(process.execPath, [path.join('./lib/benchmark/minifiers/' + minifier), filePath]);
		let result;
		try {
			result = JSON.parse(spawned.stdout);
		} catch {
			const err = new Error('Failed to minify');
			err.spawned = spawned;
			throw err;
		}
		if (results.length > 0) {
			assert(result.size === results[0].size, 'Mismatching size');
		}
		results.push(result);
	}

	const avgSpeed = results.reduce((current, next) => current + next.ms, 0) / results.length;

	return {
		ms: avgSpeed,
		size: results[0].size,
		gzipSize: results[0].gzipSize,
	};
}

const task = {
	title: 'Benchmarking',
	task(ctx) {
		ctx.results = {};
		return new Listr(
			ctx.artifacts.map(({ moduleName, version, path, code }) => {
				return {
					title: `Minifying: ${moduleName} (v${version})`,
					task(ctx, task) {
						const size = getSize(code);
						const gzipSize = getGzipSize(code);
						ctx.results[moduleName] = {
							size,
							gzipSize,
							benchmarks: {},
						};
						task.output = `${byteSize(size)} (${byteSize(gzipSize)} gzipped)`;
						return new Listr(
							[
								'babel-minify',
								'esbuild',
								'terser',
								'terser.no-compress',
								'uglify-js',
								'uglify-js.no-compress',
							].map((minifier) => ({
								title: minifier,
								async task(ctx, task) {
									const sampleSize = 10;
									const benchmarked = await benchmark({
										minifier,
										filePath: path,
										sampleSize,
										onIterationStart(iteration, lastBenchmark) {
											task.title = `${minifier} [${iteration}/${sampleSize}]`;
											if (lastBenchmark) {
												task.output = 'Last benchmark: ' + lastBenchmark.ms.toLocaleString() + 'ms';
											}
										},
									}).catch(err => {
									    console.log(err);
									    return {};
									});
									ctx.results[moduleName].benchmarks[minifier] = benchmarked;
								},
							}))
						);
					},
				};
			})
		);
	}
};

export default task;
