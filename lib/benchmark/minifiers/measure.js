import { promises as fs } from 'fs';
import { getSize, getGzipSize } from '../../utils.js';
import stripComments from 'strip-comments';

const srcCode = (await fs.readFile(process.argv[2])).toString();

export default async function (fn) {
    let hrtime;
    const start = process.hrtime();
    let minifiedCode = await fn(srcCode);
    hrtime = process.hrtime(start);

    // Remove comments from all measurements
    // console.time('stripComments');
    // minifiedCode = stripComments(minifiedCode.trim(), {
    //     keepProtected: false,
    // });
    // console.timeEnd('stripComments'); Commenting it out becaues this takes 50s on three.js

    const success = Boolean(minifiedCode);
	const size = success && getSize(minifiedCode);
	const gzipSize = success && getGzipSize(minifiedCode);

	console.log(JSON.stringify({
		ms: success ? (hrtime[0] * 1000) + (hrtime[1] / 1e6) : undefined,
        success,
        size,
        gzipSize,
	}));
};
