import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { minifiersDirectory } from './minifiers-directory.ts';
import type { MinifierLoaded } from './create-minifier.ts';

const loadMinifierByPath = async (
	minifierPath: string,
	options: {
		includePublishDate?: boolean;
		directory?: string;
	} = {},
) => {
	try {
		const { directory, includePublishDate } = options;
		const fullMinifierPath = path.join(minifiersDirectory, minifierPath);
		const hash = crypto.createHash('sha256');
		if (directory) {
			const directoryPath = path.join(minifiersDirectory, directory);
			const entries = await fs.readdir(directoryPath, {
				recursive: true,
				withFileTypes: true,
			});
			const files = entries.filter(entry => entry.isFile())
				.map(entry => path.relative(directoryPath, path.join(entry.parentPath, entry.name)))
				.sort();
			for (const file of files) {
				hash.update(file).update('\0').update(await fs.readFile(path.join(directoryPath, file))).update('\0');
			}
		} else {
			hash.update(await fs.readFile(fullMinifierPath));
		}
		const configHash = hash.digest('hex').slice(0, 10);

		const minifierModule = await import(fullMinifierPath);
		const minifier: MinifierLoaded = minifierModule.default;

		await minifier.loadMeta(minifierPath, configHash, includePublishDate);

		return minifier;
	} catch (error) {
		throw new Error(`Error loading minifier "${minifierPath}":\n${
			error instanceof Error
				? error.stack
				: JSON.stringify(error, null, '\t')
		}`);
	}
};

export const getMinifier = async (
	minifierName: string,
) => {
	const stat = await fs.stat(path.join(minifiersDirectory, minifierName)).catch(() => null);
	let directory: string | undefined;
	if (!stat) {
		minifierName += '.ts';
	} else if (stat.isDirectory()) {
		directory = minifierName;
		minifierName = path.join(minifierName, 'index.ts');
	} else if (path.basename(minifierName) === 'index.ts' && path.dirname(minifierName) !== '.') {
		directory = path.dirname(minifierName);
	}

	return await loadMinifierByPath(minifierName, { directory });
};

export const getMinifiers = async () => {
	const files = await fs.readdir(minifiersDirectory);
	const minifierFiles = files.filter(filePath => !filePath.startsWith('_'));

	return await Promise.all(minifierFiles.map(async (minifier) => {
		const stat = await fs.stat(path.join(minifiersDirectory, minifier));
		return stat.isDirectory()
			? await loadMinifierByPath(path.join(minifier, 'index.ts'), {
				includePublishDate: true,
				directory: minifier,
			})
			: await loadMinifierByPath(minifier, { includePublishDate: true });
	}));
};
