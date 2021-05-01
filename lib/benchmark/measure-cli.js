/**
 * Usage:
 * $ node measure-cli.js <minifier path> <file to minify>
 */

import { promises as fs } from 'fs';
import { getSize, getGzipSize } from '../utils.js';

const [minifierPath, filePath] = process.argv.slice(2);

const { default: minifier } = await import(minifierPath);
const code = (await fs.readFile(filePath)).toString();

const start = process.hrtime();
const minifiedCode = await minifier({
	filePath,
	code,
});
const hrtime = process.hrtime(start);
const success = Boolean(minifiedCode);

console.log(JSON.stringify({
	success,
	ms: success ? (hrtime[0] * 1000) + (hrtime[1] / 1e6) : undefined,
	size: success && getSize(minifiedCode),
	gzipSize: success && getGzipSize(minifiedCode),
}));
