import { createRequire } from 'module';
import type { MinifierFunction } from '@minification-benchmarks/minifiers';

const require = createRequire(import.meta.url);

export const getMinifier = (minifierName: string): MinifierFunction => {
	try {
		return require(`@minification-benchmarks/minifiers/minifiers/${minifierName}`).default;
	} catch (error) {
		console.error(error);
		throw new Error(`Error loading minifier "${minifierName}":\n${
			error instanceof Error
				? error.stack
				: JSON.stringify(error, null, '\t')
		}`);
	}
};
