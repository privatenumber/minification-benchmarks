import assert from 'assert';
import path from 'path';
import fs from 'fs/promises';
import minimist from 'minimist';
import { getSize, getGzipSize } from '../lib/utils/get-size';
import type { BenchmarkResult, MinifierFunction } from '../lib/types';

const getOptions = () => {
	const argv = minimist<{
		minifier: string;
		outputPath?: string;
		smokeTestPath?: string;
	}>(process.argv.slice(2))

	let {
		minifier: minifierName,
		outputPath,
		smokeTestPath,
	} = argv;

	assert(minifierName?.length, 'Minifier name must be passed in');

	let filePath = argv._[0];
	assert(filePath?.length, 'File path must be passed in');

	filePath = path.resolve(filePath);

	if (outputPath) {
		outputPath = path.resolve(outputPath);
	}

	if (smokeTestPath) {
		smokeTestPath = path.resolve(smokeTestPath);
	}

	return {
		minifierName,
		filePath,
		outputPath,
		smokeTestPath,
	};
};

const getMinifier = (minifierName: string): MinifierFunction => {
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

async function runTests(smokeTestPath: string, code: string) {
	await require(smokeTestPath).default.test(code);
}

(async ({
	minifierName,
	filePath,
	outputPath,
	smokeTestPath,
}) => {
	const minifier = getMinifier(minifierName);

	let code = await getSourceCode(filePath);

	code = await unpreserveComment(
		code,
		filePath,
	);

	// Validate that it parses
	await runTests(smokeTestPath, code);

	const start = process.hrtime();
	const minifiedCode = await minifier({
		filePath,
		code,
	});
	const hrtime = process.hrtime(start);

	// Validate that it parses
	await runTests(smokeTestPath, minifiedCode);

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
