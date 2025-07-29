import { spawn } from 'child_process';
import { collectStream } from '@minification-benchmarks/utils/collect-stream';
import { createMinifier } from '../utils/create-minifier.js';

export default createMinifier(
	'cminify',
	{
		default: async ({ code }) => {
			const executable = new URL('../node_modules/.bin/cminify', import.meta.url).pathname;
			const minify = spawn(executable, ['js', '-']);
			minify.stdin.end(code);

			const [error, minified] = await Promise.all([
				collectStream(minify.stderr),
				collectStream(minify.stdout),
			]);

			if (error) {
				const [message, ...stackLines] = error.split('\n');
				const errorObject = new Error(message);
				errorObject.stack = stackLines.join('\n');
				throw errorObject;
			}

			return minified;
		},
	}
);
