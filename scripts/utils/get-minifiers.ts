import fs from 'fs/promises';
import mem from 'mem';

export const getMinifiers = mem(async () => {
	const minifiers = await fs.readdir('scripts/minifiers');
	return minifiers.map(minifier => minifier.slice(0, -3)); // remove ".js"
});
