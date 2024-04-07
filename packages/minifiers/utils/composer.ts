import { findUp } from 'find-up';
import { readJsonFile } from '@minification-benchmarks/utils/read-json-file.js';
import type { MetaData } from './create-minifier.js';

type ComposerPackage = {
	name: string;
	version: string;
	source: {
		type: 'git';
		url: string;
	};
};

type ComposerInstalled = {
	packages: ComposerPackage[];
};

export const loadComposerInstalled = async (
	packageName: string,
) => {
	const composerInstalledPath = await findUp(
		'vendor/composer/installed.json',
		{
			cwd: new URL('..', import.meta.url).pathname,
		},
	);

	if (!composerInstalledPath) {
		return;
	}

	const installed = await readJsonFile(composerInstalledPath) as ComposerInstalled;
	return installed.packages.find(({ name }) => name === packageName);
};

export const getMeta = (
	{
		name,
		version,
		source,
	}: ComposerPackage,
): MetaData => {
	if (!source) {
		throw new Error(`No source found for ${name}`);
	}

	if (version.startsWith('v')) {
		version = version.slice(1);
	}

	let repository = source.url;

	if (source.type === 'git') {
		const gitHub = repository.match(/^(?:git\+)?(https.+)\.git$/);
		if (gitHub) {
			repository = gitHub[1];
		}
	}

	return {
		name,
		version,
		url: repository,
	};
};
