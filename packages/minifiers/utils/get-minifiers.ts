import fs from 'fs/promises';
import { minifiersDirectory } from './minifiers-directory.js';

export const getMinifiers = async () => {
	const files = await fs.readdir(minifiersDirectory);
	const getFiles = files
		.filter(filePath => !filePath.startsWith('_'))
		.map(async (minifier) => {
			const stat = await fs.stat(`${minifiersDirectory}/${minifier}`);
			if (stat.isDirectory()) {
				return minifier;
			}
			return minifier.slice(0, -'.ts'.length);
		});

	return await Promise.all(getFiles);
};
