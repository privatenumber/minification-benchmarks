import { promises as fs } from 'fs';
import { getSize, getGzipSize } from '../../utils.js';

const sourceCode = (await fs.readFile(process.argv[2])).toString();

export default async function measure(minify) {
	const start = process.hrtime();
	const minifiedCode = await minify(sourceCode);
	const hrtime = process.hrtime(start);

	const success = Boolean(minifiedCode);
	const size = success && getSize(minifiedCode);
	const gzipSize = success && getGzipSize(minifiedCode);

	console.log(JSON.stringify({
		ms: success ? (hrtime[0] * 1000) + (hrtime[1] / 1e6) : undefined,
		success,
		size,
		gzipSize,
	}));
}
