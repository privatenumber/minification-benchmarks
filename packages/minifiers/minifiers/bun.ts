import path from 'path';
import { spawn } from 'child_process';
import { streamToBuffer } from '@minification-benchmarks/utils/stream-to-buffer';
import { minifier } from '../types.js';

export default minifier(async ({ filePath }) => {
	const minify = spawn('bun', ['build', '--no-bundle', '--minify', filePath], {
		env: {
			PATH: [
				path.join(__dirname, '../node_modules/.bin'),
				process.env.PATH,
			].join(':'),
		},
	});
	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
