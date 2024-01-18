import type { MinifierFunction } from '@minification-benchmarks/minifiers';

export const getMinifier = (minifierName: string): MinifierFunction => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return require(`@minification-benchmarks/minifiers/minifiers/${minifierName}`).default;
	} catch (error) {
		console.error(error);
		throw new Error(`Error loading minifier "${minifierName}":\n${error.message}`);
	}
};
