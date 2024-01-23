import { loadPackageJson, getPackageJsonMeta } from './package-json.js';
import { loadComposerInstalled, getMeta } from './composer.js';

export type MinifierFunction = (
	minifySubject: {
		code: string;
		filePath: string;
	},
) => Promise<string>;

type Minifiers = Record<string, MinifierFunction>;

export type MetaData = {
	name: string;
	version: string;
	repository: string;
};

export class Minifier {
	name: string;
	minifiers: Minifiers;
	meta?: MetaData;

	constructor(
		name: string,
		minifiers: Minifiers,
	) {
		this.name = name;
		this.minifiers = minifiers;
	}

	async loadMeta() {
		const packageJson = await loadPackageJson(this.name);
		if (packageJson) {
			this.meta = getPackageJsonMeta(packageJson);
			return;
		}

		const composerInstalled = await loadComposerInstalled(this.name);
		if (composerInstalled) {
			this.meta = getMeta(composerInstalled);
		}
	}
}

export const createMinifier = (
	label: string,
	minifiers: Minifiers,
) => new Minifier(label, minifiers);
