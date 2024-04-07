import type { Artifact } from '@minification-benchmarks/artifacts';

// Result for a minifier benchmark given a file
export type BenchmarkData = {
	minifiedSize: number;
	minzippedSize: number;
	time: number;
};

export type BenchmarkResultSuccess<Extended = unknown> = {
	data: BenchmarkData & Extended;
};

export type BenchmarkError = {
	error: {
		message: string;
		stack?: string;
		stage?: string;
	};
};

export type BenchmarkResult<Extended = unknown> = (
	BenchmarkResultSuccess<Extended>
	| BenchmarkError
);

export type BenchmarkResultSuccessWithRuns = BenchmarkResultSuccess<{ runs: number }>;
export type BenchmarkResultWithRuns = BenchmarkResult<{ runs: number }>;

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
};

export type MinifierResult = MinifierResultFailed | MinifierResultSuccess;

export type BenchmarkedArtifact = {
	artifact: Artifact;
	benchmarkResults: MinifierResult[];
};
