import path from 'path';
import fs from 'fs/promises';
import mem from 'mem';

export const getMinifiers = mem(async () => {
	const minifiers = await fs.readdir(path.resolve(__dirname, '../minifiers'));
	return minifiers
		.filter(
			minifierPath => (
				!minifierPath.startsWith('_')
				&& minifierPath.endsWith('.ts')
			),
		)
		.map(minifier => minifier.slice(0, -3)); // remove ".ts"
});
