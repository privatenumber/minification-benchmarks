import type { BenchmarkResultWithRuns } from '@minification-benchmarks/bench/types.js';

export type Minifier<Result = BenchmarkResultWithRuns> = {
	minifierPath: string;
	version: string;
	configHash: string;
	result: Result;
};

export type Artifact = {
	version: string;
	filePath: string;
	size: number;
	gzipSize: number;
	minified: {
		[minifierName: string]: Minifier;
	};
};

export type Data = {
	[artifact: string]: Artifact;
};
