import fs from 'fs/promises';
import { artifactsDirectory } from './artifacts-directory.js';

export const getArtifacts = async () => {
	let fileNames = await fs.readdir(artifactsDirectory);

	fileNames = fileNames.filter(
		fileName => !fileName.startsWith('.'),
	);

	// TODO: Sort by size somewhere else
	// artifacts.sort(
	// 	(a, b) => a.size - b.size,
	// );

	return fileNames;
};
