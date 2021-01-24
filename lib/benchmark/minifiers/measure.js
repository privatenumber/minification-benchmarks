import { promises as fs } from 'fs';
import { getSize, getGzipSize } from '../../utils.js';

const filePath = process.argv[2];
const code = (await fs.readFile(filePath)).toString();

export default async function measure(minify) {
	const start = process.hrtime();
	const minifiedCode = await minify({
		filePath,
		code,
	});
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
