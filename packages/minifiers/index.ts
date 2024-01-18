import fs from 'fs/promises';
import mem from 'mem';

const minifiersDirectory = new URL('minifiers', import.meta.url).pathname;

export const getMinifiers = mem(async () => {
	const minifiers = await fs.readdir(minifiersDirectory);
	return minifiers
		.filter(
			minifierPath => (
				!minifierPath.startsWith('_')
				&& minifierPath.endsWith('.ts')
			),
		)
		.map(minifier => minifier.slice(0, -3)); // remove ".ts"
});

export * from './types';
