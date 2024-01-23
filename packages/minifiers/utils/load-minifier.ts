import path from 'path';
import fs from 'fs/promises';
import { minifiersDirectory } from './minifiers-directory.js';
import type { MinifierLoaded } from './create-minifier.js';

export const loadMinifier = async (
	minifierName: string,
) => {
	let minifierPath = path.join(minifiersDirectory, minifierName);
	const stat = await fs.stat(minifierPath).catch(() => null);
	if (stat?.isDirectory()) {
		minifierPath = path.join(minifierPath, 'index.ts');
	}

	try {
		const minifierModule = await import(minifierPath);

		const minifier: MinifierLoaded = minifierModule.default;

		await minifier.loadMeta();

		return minifier;
	} catch (error) {
		throw new Error(`Error loading minifier "${minifierName}":\n${
			error instanceof Error
				? error.stack
				: JSON.stringify(error, null, '\t')
		}`);
	}
};
