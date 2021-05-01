/**
 * Usage:
 * $ node measure-cli.js <minifier path> <file to minify>
 */

import fs from 'fs/promises';
import { getSize, getGzipSize } from '../utils.js';

const [minifierPath, filePath] = process.argv.slice(2);

(async () => {
	// eslint-disable-next-line node/global-require
	const { default: minifier } = require(minifierPath);
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
})();
