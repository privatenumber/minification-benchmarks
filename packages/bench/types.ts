import type { Artifact } from '@minification-benchmarks/artifacts';

// Result for a minifier benchmark given a file
export type BenchmarkData = {
	minifiedSize: number;
	minzippedSize: number;
	time: number;
};

export type BenchmarkResultSuccess = {
	result: BenchmarkData;
};

export type BenchmarkError = {
	error: {
		message: string;
		stack?: string;
		context?: string;
	};
};

export type BenchmarkResult = BenchmarkResultSuccess | BenchmarkError;

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
