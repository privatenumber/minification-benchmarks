import fs from 'fs/promises';
import path from 'path';
import assert from 'assert';
import { readPackageUp, type NormalizedPackageJson } from 'read-pkg-up';
import { getSize, getGzipSize } from '@minification-benchmarks/utils/get-size';
import { unpreserveComments } from './unpreserve-comments.js';
import type { Test } from './define-test.js';
import { requireString } from './require-string.js';
import { blockConsole } from './block-console.js';

type ArtifactMeta = {
	package: string;
	filePath: string;
};

const readPublicPackageUp = async (cwd: string) => {
	let packageFound = await readPackageUp({ cwd });
	while (packageFound!.packageJson.private || !packageFound!.packageJson.name) {
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

	fullFilePath: string;

	code?: string;

	size?: number;

	gzipSize?: number;

	packageJson?: NormalizedPackageJson;

	// Set by loadArtifact
	name?: string;

	loadTest?: () => Promise<Test>;

	constructor(
		meta: ArtifactMeta,
	) {
		this.meta = meta;
		this.filePath = meta.filePath;
		this.fullFilePath = path.join(nodeModulesPath, meta.package, this.filePath);
	}

	async load() {
		await Promise.all([
			this.loadCode(),
			this.loadMeta(),
		]);
	}

	async loadCode() {
		let code = await fs.readFile(this.fullFilePath, 'utf8');
		code = await unpreserveComments(code, this.fullFilePath);
		this.code = code;
		this.size = getSize(code);
		this.gzipSize = getGzipSize(code);
	}

	async loadMeta() {
		const packageJson = await readPublicPackageUp(this.fullFilePath);
		assert.ok(this.meta.package === packageJson.name, `Mismatching package name: ${this.meta.package} !== ${packageJson.name}`);
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

		const privateConsole = blockConsole();
		try {
			const codeExport = requireString(code);
			await test.run(codeExport);
		} finally {
			privateConsole.restore();
		}
	}
}

export interface ArtifactLoaded extends Artifact {
	name: string;

	code: string;

	size: number;

	gzipSize: number;

	packageJson: NormalizedPackageJson;
}

export const defineArtifact = (
	artifactMeta: ArtifactMeta,
) => new Artifact(artifactMeta);
