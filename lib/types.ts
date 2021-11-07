import task from 'tasuku';

export type Tasuku = typeof task;

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
export type BenchmarkData = {
	minifiedSize: number;
	minzippedSize: number;
	time: number;
};

export type BenchmarkResultSuccess = {
	data: BenchmarkData;
};

type BenchmarkResultFailed = {
	error: string;
};

export type BenchmarkResult = BenchmarkResultSuccess | BenchmarkResultFailed;

export type AverageBenchmarkData<format = number> = {
	minifiedSize: format;
	minzippedSize: format;
	averageTime: format;
};

type MinifierResultFailed = {
	name: string;
	error: string;
};

export type MinifierResultSuccess = {
	name: string;
	data: {
		raw: AverageBenchmarkData;
		formatted: AverageBenchmarkData<string>;
	};
	runs: BenchmarkData[];
}

export type MinifierResult = MinifierResultFailed | MinifierResultSuccess;

export type BenchmarkedArtifact = {
	artifact: Artifact;
	benchmarkResults: MinifierResult[];
}

export type MinifierFunction = (minifySubject: {
	code: string;
	filePath: string;
}) => Promise<string>;

export const minifier = (minifierFunction: MinifierFunction): MinifierFunction => minifierFunction;

export type ArtifactMeta = {
	path: string;
	test: (code: string) => void;
};

export const artifactMeta = (artifactMetaObject: ArtifactMeta): ArtifactMeta => artifactMetaObject;
