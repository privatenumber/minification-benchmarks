import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';

export const requireString = (code: string) => {
	const vol = Volume.fromJSON({ '/index.js': code });
	const fsRequire = createFsRequire(vol);
	return fsRequire('/index');
};

function disablelogs() {
	const stdoutWrite = process.stdout.write;
	const stderrWrite = process.stderr.write;

	// @ts-expect-error
	process.stdout.write = () => {};
	// @ts-expect-error
	process.stderr.write = () => {};

	return function reenable() {
		process.stdout.write = stdoutWrite;
		process.stderr.write = stderrWrite;
	};
}

export async function runTest(testPath: string, code: string) {
	// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
	const { preprocess, run } = require(testPath).default;

	if (preprocess) {
		code = preprocess(code);
	}

	const reenableLogs = disablelogs();
	
	try {
		await run(requireString(code));
	} catch (error) {		
		if (error instanceof Error) {
			// eslint-disable-next-line unicorn/prefer-type-error
			throw new Error(`Invalid output: ${error.name}`);
		}

		throw new Error('Invalid output');
	} finally {
		reenableLogs();
	}
}
