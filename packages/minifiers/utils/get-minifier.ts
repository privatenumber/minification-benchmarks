import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { minifiersDirectory } from './minifiers-directory.ts';
import type { MinifierLoaded } from './create-minifier.ts';

const loadMinifierByPath = async (
	minifierPath: string,
	options: {
		includePublishDate?: boolean;
	} = {},
) => {
	try {
		const stat = await fs.stat(path.join(minifiersDirectory, minifierPath)).catch(() => null);
		if (stat?.isDirectory()) {
			minifierPath = path.join(minifierPath, 'index.ts');
		} else if (!stat && !minifierPath.endsWith('.ts')) {
			minifierPath += '.ts';
		}
		const directory = path.basename(minifierPath) === 'index.ts' && path.dirname(minifierPath) !== '.'
			? path.dirname(minifierPath)
			: undefined;
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
		hash.update('\0utils/run-minifier.ts\0').update(await fs.readFile(new URL('run-minifier.ts', import.meta.url)));
		const configHash = hash.digest('hex').slice(0, 10);

		const minifierModule = await import(fullMinifierPath);
		const minifier: MinifierLoaded = minifierModule.default;

		await minifier.loadMeta(minifierPath, configHash, options.includePublishDate);

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
) => loadMinifierByPath(minifierName);

export const getMinifiers = async (
	options: { includePublishDate?: boolean } = {},
) => {
	const files = await fs.readdir(minifiersDirectory);
	const minifierFiles = files.filter(filePath => !filePath.startsWith('_'));

	return await Promise.all(minifierFiles.map(minifier => loadMinifierByPath(minifier, options)));
};
