import fs from 'fs/promises';
import mem from 'mem';
import { minifiersDirectory } from './minifiers-directory.js';

// TODO: is this actually called often?
export const getMinifiers = mem(async () => {
	const files = await fs.readdir(minifiersDirectory);
	return files
		.filter(
			filePath => (
				!filePath.startsWith('_')
				&& filePath.endsWith('.ts')
			),
		)
		.map(filePath => filePath.slice(0, -3));
});
