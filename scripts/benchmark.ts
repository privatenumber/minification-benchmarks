import assert from 'assert';
import path from 'path';
import fs from 'fs/promises';
import minimist from 'minimist';
import { getSize, getGzipSize } from '../lib/utils/get-size';
import type { BenchmarkResult } from '../lib/types';

const getOptions = () => {
	const argv = minimist(process.argv.slice(2));
	const minifierName: string = argv.minifier;
	let { outputPath } = argv;
	let filePath: string = argv._[0];

	assert(minifierName?.length, 'Minifier name must be passed in');
	assert(filePath?.length, 'File path must be passed in');

	if (outputPath) {
		outputPath = path.resolve(outputPath);
	}

	filePath = path.resolve(filePath);

	return {
		minifierName,
		filePath,
		outputPath,
	};
};

const getMinifier = (minifierName: string) => {
	try {
		// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
		return require(`../lib/minifiers/${minifierName}`).default;
	} catch {
		throw new Error(`Error loading minifier "${minifierName}"`);
	}
};

const getSourceCode = async (filePath: string) => {
	assert(filePath?.length, 'File path must be passed in');
	const sourceCode = await fs.readFile(filePath);
	return sourceCode.toString();
};

// TODO: Move out
const preservedComment = /\/\*!/g;
const legalComment = /\* @license/g;

async function unpreserveComment(
	code: string,
	filePath: string,
) {
	let strippedCode = code;

	if (preservedComment.test(strippedCode)) {
		strippedCode = strippedCode.replace(preservedComment, '/*');
	}

	if (legalComment.test(strippedCode)) {
		strippedCode = strippedCode.replace(legalComment, '*');
	}

	if (code !== strippedCode) {
		// For minifiers like Google Closure that read from path
		await fs.writeFile(filePath, strippedCode);
	}

	return strippedCode;
}

(async ({
	minifierName,
	filePath,
	outputPath,
}) => {
	const minifier = getMinifier(minifierName);
	const code = await unpreserveComment(
		await getSourceCode(filePath),
		filePath,
	);

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

	if (outputPath) {
		await fs.writeFile(outputPath, minifiedCode);
	}
})(getOptions());
