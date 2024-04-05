import fs from 'fs/promises';
import commentMark from 'comment-mark';
import path from 'path';
import { markdownTable } from 'markdown-table';
import outdent from 'outdent';
import byteSize from 'byte-size';
import { minBy } from 'lodash-es';
import { format } from 'date-fns';
// import * as mdu from '@minification-benchmarks/utils/mdu';
// import { percent } from '@minification-benchmarks/utils/formatting';

const readmePath = './README.md';

const readme = await fs.readFile(readmePath, 'utf8');

console.log({ readme });
const readmeMd = commentMark(await fs.readFile(README_PATH), {
	lastUpdated: format(new Date(), 'MMM d, y'),
	benchmarks,
});

await fs.writeFile(readmePath, readme);
