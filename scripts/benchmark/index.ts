import fs from 'fs/promises';
import assert from 'assert';
import path from 'path';
import { cli } from 'cleye';
import { getSize, getGzipSize } from '../../lib/utils/get-size';
import type { BenchmarkData } from '../../lib/types';
import { getMinifier } from './get-minifier';
import { unpreserveComment } from './unpreserve-comments';
import { runTest } from './run-test';

(async () => {
	const argv = cli({
		name: 'benchmark',

		parameters: ['<file-path>'],

		flags: {
			minifier: {
				type: String,
				alias: 'm',
				description: 'Minifier name from lib/minifiers',
			},

			outputPath: {
				type: String,
				alias: 'o',
				description: 'Output path for minified code',
			},

			testPath: {
				type: String,
				alias: 't',
				description: 'Path to test file. Executed before and after minification',
			},
		},
	});

	const {
		minifier: minifierName,
		outputPath,
		testPath,
	} = argv.flags;

	assert(minifierName, 'Minifier name must be passed in');

	const minifier = getMinifier(minifierName);

	assert(argv._.filePath, 'File path must be passed in');

	const filePath = path.resolve(argv._.filePath);

	let code = await fs.readFile(filePath, 'utf8');

	code = await unpreserveComment(
		code,
		filePath,
	);

	if (testPath) {
		await runTest(testPath, code);
	}

	const startTime = process.hrtime();
	let minifiedCode: Awaited<ReturnType<typeof minifier>>;
	try {
		minifiedCode = await minifier({
			filePath,
			code,
		});
	} catch {
		throw new Error('Failed to minify');
	}
	const hrtime = process.hrtime(startTime);

	if (testPath) {
		await runTest(testPath, minifiedCode);
	}

	const success = Boolean(minifiedCode);

	console.log(JSON.stringify({
		minifiedSize: success && getSize(minifiedCode),
		minzippedSize: success && getGzipSize(minifiedCode),
		time: success && (hrtime[0] * 1000) + (hrtime[1] / 1e6),
	} as BenchmarkData));

	if (outputPath) {
		await fs.writeFile(outputPath, minifiedCode);
	}
})().catch((error) => {
	console.error(JSON.stringify({
		error: error.message,
	}));

	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
