import fs from 'fs/promises';
import path from 'path';
import assert from 'assert';
import { readPackageUp, type NormalizedPackageJson } from 'read-pkg-up';
import { getSize, getGzipSize } from '@minification-benchmarks/utils/get-size';
import type { ArtifactMeta } from './define-artifact.js';
import { unpreserveComments } from './unpreserve-comments.js';
import type { Test } from './define-test.js';
import { requireString } from './require-string.js';
import { blockConsole } from './block-console.js';

const readPublicPackageUp = async (cwd: string) => {
	let packageFound = await readPackageUp({ cwd });
	while (packageFound!.packageJson.private) {
		packageFound = await readPackageUp({
			cwd: path.join(path.dirname(packageFound!.path), '..'),
		});
	}
	return packageFound!.packageJson;
};

const nodeModulesPath = new URL('../node_modules', import.meta.url).pathname;

export class Artifact {
	meta: ArtifactMeta;

	filePath: string;

	code?: string;

	size?: number;

	gzipSize?: number;

	packageJson?: NormalizedPackageJson;

	loadTest?: () => Promise<Test>;

	constructor(
		meta: ArtifactMeta,
	) {
		this.meta = meta;
		this.filePath = path.join(nodeModulesPath, meta.package, meta.filePath);
	}

	async load() {
		await Promise.all([
			this.loadCode(),
			this.loadMeta(),
		]);
	}

	async loadCode() {
		let code = await fs.readFile(this.filePath, 'utf8');
		code = await unpreserveComments(code, this.filePath);
		this.code = code;
		this.size = getSize(code);
		this.gzipSize = getGzipSize(code);
	}

	async loadMeta() {
		const packageJson = await readPublicPackageUp(this.filePath);
		assert(this.meta.package === packageJson.name, 'Mismatching package name');
		this.packageJson = packageJson;
	}

	async validate(
		code?: string,
	) {
		if (!this.loadTest) {
			console.error(`No test for ${this.meta.package}`);
			return;
		}

		if (!code) {
			code = this.code;
		}

		if (!code) {
			throw new Error('No code');
		}

		const test = await this.loadTest();

		if (test.preprocess) {
			code = test.preprocess(code);
		}

		const codeExport = requireString(code);
		const restoreConsole = blockConsole();
		test.run(codeExport);
		restoreConsole();
	}
}
