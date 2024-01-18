import path from 'path';
import { spawn } from 'child_process';
import { streamToBuffer } from '@minification-benchmarks/utils/stream-to-buffer';
import { minifier } from '../types.js';

const bunPath = path.join(__dirname, '../node_modules/.bin/bun');

export default minifier(async ({ filePath }) => {
	const minify = spawn(bunPath, ['build', '--no-bundle', '--minify', filePath]);
	const minified = await streamToBuffer(minify.stdout);
	return minified.toString();
});
