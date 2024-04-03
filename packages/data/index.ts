import fs from 'fs/promises';
import { readJsonFile } from '@minification-benchmarks/utils/read-json-file.js';
import type { Data } from './types.js';

const dataPath = new URL('./data.json', import.meta.url).pathname;

export let data: Data = {};

export const getData = async () => {
	data = await readJsonFile(dataPath) as Data;
};

await getData();

export const saveData = async () => {
	await fs.writeFile(dataPath, JSON.stringify(data, null, '\t'));
};
