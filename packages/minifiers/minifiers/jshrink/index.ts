import { spawn } from 'child_process';
import { collectStream } from '@minification-benchmarks/utils/collect-stream';
import { createMinifier } from '../../utils/create-minifier.js';

const jshrinkPath = new URL('jshrink.php', import.meta.url).pathname;

export default createMinifier(
	'tedivm/jshrink',
	{
		default: async ({ code }) => {
			const minify = spawn('php', [jshrinkPath], {
				// Needs to be context of composer install
				cwd: new URL('..', import.meta.url).pathname,
			});

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
	},
);
