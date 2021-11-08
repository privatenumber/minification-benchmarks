import fs from 'fs/promises';
import { getSize, getGzipSize } from '../../lib/utils/get-size';
import type { BenchmarkData } from '../../lib/types';
import { getMinifier } from './get-minifier';
import { unpreserveComment } from './unpreserve-comments';
import { getOptions } from './get-options';
import { runTest } from './run-test';

(async ({
	minifierName,
	filePath,
	outputPath,
	testPath,
}) => {
	const minifier = getMinifier(minifierName);

	let code = await fs.readFile(filePath, 'utf-8');

	code = await unpreserveComment(
		code,
		filePath,
	);

	if (testPath) {
		await runTest(testPath, code);
	}

	const start = process.hrtime();
	const minifiedCode = await minifier({
		filePath,
		code,
	});
	const hrtime = process.hrtime(start);

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
})(getOptions()).catch((error) => {
	console.error(JSON.stringify({
		error: error.message,
	}));

	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
