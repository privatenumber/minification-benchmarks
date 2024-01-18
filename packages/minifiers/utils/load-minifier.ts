import path from 'path';
import { minifiersDirectory } from './minifiers-directory.js';
import type { MinifierFunction } from './create-minifier.js';

export const loadMinifier = async (
	minifierName: string,
) => {
	try {
		const minifier = await import(
			path.join(minifiersDirectory, minifierName)
		);
		return minifier.default as MinifierFunction;
	} catch (error) {
		console.error(error);
		throw new Error(`Error loading minifier "${minifierName}":\n${
			error instanceof Error
				? error.stack
				: JSON.stringify(error, null, '\t')
		}`);
	}
};
