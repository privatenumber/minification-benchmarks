import assert from 'assert';
import path from 'path';
import fs from 'fs/promises';
import minimist from 'minimist';
import { getSize, getGzipSize } from './utils/get-size';
import type { BenchmarkResult } from './types';

const getOptions = () => {
	const argv = minimist(process.argv.slice(2));
	const minifierName: string = argv.minifier;
	let filePath: string = argv._[0];

	assert(minifierName?.length, 'Minifier name must be passed in');
	assert(filePath?.length, 'File path must be passed in');

	filePath = path.resolve(filePath);

	return {
		minifierName,
		filePath,
	};
};

const getMinifier = (minifierName: string) => {
	try {
		// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
		return require(`../scripts/minifiers/${minifierName}`).default;
	} catch {
		throw new Error(`Error loading minifier "${minifierName}"`);
	}
};

const getSourceCode = async (filePath: string) => {
	assert(filePath?.length, 'File path must be passed in');
	const sourceCode = await fs.readFile(filePath);
	return sourceCode.toString();
};

(async ({ minifierName, filePath }) => {
	const minifier = getMinifier(minifierName);
	const code = await getSourceCode(filePath);

	const start = process.hrtime();
	const minifiedCode = await minifier({
		filePath,
		code,
	});
	const hrtime = process.hrtime(start);
	const success = Boolean(minifiedCode);

	console.log(JSON.stringify({
		minifiedSize: success && getSize(minifiedCode),
		minzippedSize: success && getGzipSize(minifiedCode),
		time: success && (hrtime[0] * 1000) + (hrtime[1] / 1e6),
	} as BenchmarkResult));
})(getOptions());
