// google-closure-compiler is no longer maintained
// https://github.com/google/closure-compiler-npm/blob/master/packages/google-closure-compiler-js/readme.md

import googleClosureCompiler from 'google-closure-compiler';
import { minifier } from '../types';

const { compiler: Compiler } = googleClosureCompiler;

export default minifier(async ({ filePath }) => {
	const compiler = new Compiler({
		js: filePath,
	});

	const code = await new Promise((resolve, reject) => {
		compiler.run((exitCode, stdOut, stdError) => {
			if (exitCode > 0) {
				reject(stdError);
				return;
			}
			resolve(stdOut);
		});
	});

	return code as string;
});
