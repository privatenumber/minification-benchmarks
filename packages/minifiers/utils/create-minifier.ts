import { loadPackageJson, getPackageJsonMeta } from './package-json.ts';
import { loadComposerInstalled, getMeta } from './composer.ts';

export type MinifierFunction = (
	minifySubject: {
		code: string;
		filePath: string;
	},
) => Promise<string>;

type Instances = Record<string, MinifierFunction>;

export type MetaData = {
	name: string;
	version: string;
	url: string;
	registry: 'npm' | 'composer';
};

export class Minifier {
	minifierPath?: string;

	name: string;

	instances: Instances;

	meta?: MetaData;

	configHash?: string;

	constructor(
		name: string,
		instances: Instances,
	) {
		this.name = name;
		this.instances = instances;
	}

	async loadMeta(
		minifierPath: string,
		configHash: string,
	) {
		this.minifierPath = minifierPath;
		this.configHash = configHash;

		const packageJson = await loadPackageJson(this.name);
		if (packageJson) {
			this.meta = getPackageJsonMeta(packageJson);
			return;
		}

		const composerInstalled = await loadComposerInstalled(this.name);
		if (composerInstalled) {
			this.meta = getMeta(composerInstalled);
			return;
		}
		throw new Error(`No package metadata found for minifier "${this.name}"`);
	}
}

export type MinifierLoaded = {
	meta: MetaData;
} & Minifier;

export const createMinifier = (
	minifierName: string,
	instances: Instances,
) => new Minifier(minifierName, instances);
