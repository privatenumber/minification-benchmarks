// Result for a minifier benchmark given a file
export type BenchmarkData = {
	minifiedBytes: number;
	minzippedBytes: number;
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
