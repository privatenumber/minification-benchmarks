import type { MinifierFunction } from '../../lib/types';

export const getMinifier = (minifierName: string): MinifierFunction => {
	try {
		// eslint-disable-next-line node/global-require,@typescript-eslint/no-var-requires
		return require(`../../lib/minifiers/${minifierName}`).default;
	} catch {
		throw new Error(`Error loading minifier "${minifierName}"`);
	}
};
