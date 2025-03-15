import { loadPackageJson, getPackageJsonMeta } from './package-json.js';
import { loadComposerInstalled, getMeta } from './composer.js';

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
	publishDate?: Date;
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
			const response = await fetch(`https://registry.npmjs.org/${packageJson.name}`);
			const json = await response.json() as {
				time: Record<string, string>;
			};
			const publishDate = new Date(json.time[packageJson.version!]);
			this.meta = {
				...getPackageJsonMeta(packageJson),
				publishDate,
			};
			return;
		}

		const composerInstalled = await loadComposerInstalled(this.name);
		if (composerInstalled) {
			this.meta = getMeta(composerInstalled);
		}
	}
}

export interface MinifierLoaded extends Minifier {
	meta: MetaData;
}

export const createMinifier = (
	minifierName: string,
	instances: Instances,
) => new Minifier(minifierName, instances);
