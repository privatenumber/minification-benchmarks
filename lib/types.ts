export type Artifact = {
	artifactFilePath: string;
	moduleName: string;
	moduleVersion: string;
	modulePath: string;
	code: Buffer;
	size: number;
	gzipSize: number;
}

// Result for a minifier benchmark given a file
export type BenchmarkResult = {
	minifiedSize: number;
	minzippedSize: number;
	time: number;
};

// BenchmarkResult with minifier name
export type MinifierBenchmarkResult = {
	minifier: string;
	result: BenchmarkResult;
};

export type MinifierBenchmarksResultObject = {
	[minifierName: string]: BenchmarkResult[];
};

// Artifact and collection of minification results
export type ArtifactMinifierBenchmarks = {
	artifact: Artifact;
	results: MinifierBenchmarksResultObject;
};

// Collection of minification benchmarks for artifacts
export type ArtifactsMinifierBenchmarks = {
	[artifactName: string]: ArtifactMinifierBenchmarks;
};

export type MinifierFunction = (minifySubject: {
	code: string;
	filePath: string;
}) => Promise<string>;

export const minifier = (minifierFunction: MinifierFunction): MinifierFunction => minifierFunction;

export type ArtifactMeta = {
	path: string;
	test: () => void;
};

export const artifactMeta = (artifactMetaObject: ArtifactMeta): ArtifactMeta => artifactMetaObject;
