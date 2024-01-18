import { createRequire } from 'module';
import type { MinifierFunction } from './create-minifier.js';

const require = createRequire(import.meta.url);

export const loadMinifier = (
	minifierName: string,
): MinifierFunction => {
	try {
		return require(`../minifiers/${minifierName}`).default;
	} catch (error) {
		console.error(error);
		throw new Error(`Error loading minifier "${minifierName}":\n${
			error instanceof Error
				? error.stack
				: JSON.stringify(error, null, '\t')
		}`);
	}
};
