import path from 'path';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { blockConsoleLog } from './block-console-log';

export const requireString = (
	code: string,
) => {
	const vol = Volume.fromJSON({ '/index.js': code });
	const fsRequire = createFsRequire(vol);
	return fsRequire('/index');
};

export const runTest = async (
	testPath: string,
	code: string,
) => {
	// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
	const { preprocess, run } = require(path.resolve(testPath)).default;

	if (preprocess) {
		code = preprocess(code);
	}

	const restoreConsoleLogs = blockConsoleLog();
	try {
		await run(requireString(code));
	} catch (error) {
		if (error instanceof Error) {
			// eslint-disable-next-line unicorn/prefer-type-error
			throw new Error(`Invalid output: ${error.name}`);
		}

		throw new Error('Invalid output');
	} finally {
		restoreConsoleLogs();
	}
};
