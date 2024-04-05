import path from 'path';
import { findUp } from 'find-up';
import type { PackageJson } from 'type-fest';
import { readJsonFile } from '@minification-benchmarks/utils/read-json-file.js';
import type { MetaData } from './create-minifier.js';

export const loadPackageJson = async (
	packageName: string,
) => {
	const packageJsonPath = await findUp(
		path.join('node_modules'!, packageName, 'package.json'),
		{
			cwd: new URL('..', import.meta.url).pathname,
		},
	);

	if (packageJsonPath) {
		return (await readJsonFile(packageJsonPath)) as PackageJson;
	}
};

export const getPackageJsonMeta = (
	packageJson: PackageJson,
): MetaData => {
	let { repository } = packageJson;
	if (!repository) {
		throw new Error(`No repository found for ${packageJson.name}`);
	}

	if (typeof repository === 'object') {
		let { url } = repository;
		if (repository.type === 'git') {
			const gitHub = url.match(/^git\+(http.+)\.git$/);
			url = gitHub ? gitHub[1] : url;
		}
		repository = url;
	}

	if (!repository.startsWith('http')) {
		repository = `https://github.com/${repository}`;
	}

	return {
		name: packageJson.name!,
		version: packageJson.version!,
		repository,
	};
};
