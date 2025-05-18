import Compiler from 'google-closure-compiler';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'google-closure-compiler',
	{
		default: async ({ filePath }) => {
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
		},
	},
);
