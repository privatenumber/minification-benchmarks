export type ArtifactMeta = {
	package: string;
	modulePath: string;
};

export type Artifact = {
	packageName: string;
	packageVersion: string;
	modulePath: string;
	fullModulePath: string;
	artifactCode: Buffer;
	size: number;
	gzipSize: number;
	testPath: string;
};
