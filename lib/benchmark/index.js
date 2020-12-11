import assert from 'assert';
import execa from 'execa';
import Listr from 'listr';
import path from 'path';
import { getSize, getGzipSize } from '../utils.js';

async function benchmark(minifier, codePath, count) {
	const results = [];
	while (count--) {
		const spawned = await execa(process.execPath, [path.join('./lib/benchmark/minifiers/' + minifier), codePath]);
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
                    task(ctx) {
                        ctx.results[moduleName] = {
                            size: getSize(code),
                            gzipSize: getGzipSize(code),
                            benchmarks: {},
                        };

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
                                    const benchmarked = await benchmark(minifier, path, 10).catch(err => {
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
