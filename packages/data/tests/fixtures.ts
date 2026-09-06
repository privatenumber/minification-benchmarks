import type { BenchmarkResultSuccessWithRuns } from '@minification-benchmarks/bench/types.ts';
import type { Minifier } from '../types.ts';
import type { AnalyzedData } from '../update-readme/analyzed-data.ts';

export const successfulResult = (
	minifiedBytes: number,
	minzippedBytes: number,
	time: number,
): BenchmarkResultSuccessWithRuns => ({
	data: {
		minifiedBytes,
		minzippedBytes,
		time,
		runs: 5,
	},
});

type SuccessMinifier = Minifier<BenchmarkResultSuccessWithRuns>;

const minifier = (result: BenchmarkResultSuccessWithRuns): SuccessMinifier => ({
	minifierPath: 'minifiers/fake.ts',
	version: '1.0.0',
	configHash: '',
	result,
});

const swc = minifier(successfulResult(20, 10, 30));
const terserFailed: Minifier = {
	minifierPath: 'minifiers/terser.ts',
	version: '1.0.0',
	configHash: '',
	result: {
		error: {
			stage: 'minification',
			message: 'terser exploded',
		},
	},
};
const swcD3 = minifier(successfulResult(40, 14, 60));
const terserNoCompress = minifier(successfulResult(38, 15, 50));

/**
 * Shared benchmark fixture. Typed directly as `AnalyzedData` so a future
 * shape change fails here instead of at every consumer. Deliberately varies
 * winners and includes a failure, a variant configuration, and distinct
 * minified vs minzipped sizes. All awards are consistent with the values.
 */
export const analyzedData: AnalyzedData = [
	['react', {
		version: '17.0.2',
		filePath: '/react.js',
		size: 100,
		gzipSize: 40,
		minified: {
			'@swc/core': swc,
			terser: terserFailed,
		},
		minifiedWithScores: [
			{
				minifierName: '@swc/core',
				minifier: swc,
				score: 0.1,
			},
			{
				minifierName: 'terser',
				minifier: terserFailed,
				score: Number.POSITIVE_INFINITY,
			},
		],
		bestMinified: ['@swc/core', swc],
		bestMinzipped: ['@swc/core', swc],
		bestSpeed: ['@swc/core', swc],
	}],
	['d3', {
		version: '7.0.0',
		filePath: '/d3.js',
		size: 200,
		gzipSize: 80,
		minified: {
			'@swc/core': swcD3,
			'terser (no compress)': terserNoCompress,
		},
		minifiedWithScores: [
			{
				minifierName: '@swc/core',
				minifier: swcD3,
				score: 0.2,
			},
			{
				minifierName: 'terser (no compress)',
				minifier: terserNoCompress,
				score: 0.5,
			},
		],
		bestMinified: ['terser (no compress)', terserNoCompress],
		bestMinzipped: ['@swc/core', swcD3],
		bestSpeed: ['terser (no compress)', terserNoCompress],
	}],
];
