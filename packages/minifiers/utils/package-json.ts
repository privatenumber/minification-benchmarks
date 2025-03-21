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

const parseRepository = (
	packageJson: PackageJson,
) => {
	let { repository } = packageJson;

	if (repository) {
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
	}

	return repository;
};

export const getPackageJsonMeta = (
	packageJson: PackageJson,
): MetaData => {
	const url = parseRepository(packageJson) ?? packageJson.homepage;
	if (!url) {
		throw new Error(`No url found in ${packageJson.name} package.json`);
	}

	return {
		name: packageJson.name!,
		version: packageJson.version!,
		url,
		registry: 'npm',
	};
};
