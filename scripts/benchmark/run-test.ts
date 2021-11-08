import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';

export const requireString = (code: string) => {
	const vol = Volume.fromJSON({ '/index.js': code });
	const fsRequire = createFsRequire(vol);
	return fsRequire('/index');
};

export async function runTest(testPath: string, code: string) {
	// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
	const { preprocess, run } = require(testPath).default;

	if (preprocess) {
		code = preprocess(code);
	}

	try {
		await run(requireString(code));
	} catch (error) {
		if (error instanceof Error) {
			// eslint-disable-next-line unicorn/prefer-type-error
			throw new Error(error.name);
		}
	}
}
