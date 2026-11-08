import { minBy } from 'lodash-es';
import type { BenchmarkResultSuccessWithRuns, BenchmarkResultWithRuns } from '@minification-benchmarks/bench/types.ts';
import { data } from '../data/index.ts';
import type { Artifact, Minifier } from '../types.ts';

export type BestMinifier = [
	name: string,
	Minifier<BenchmarkResultSuccessWithRuns>,
];

export type MinifierWithScore<T = BenchmarkResultWithRuns> = {
	minifierName: string;
	minifier: Minifier<T>;
	score: number;
};

export const isSuccessful = (m: MinifierWithScore): m is MinifierWithScore<BenchmarkResultSuccessWithRuns> => 'data' in m.minifier.result;

export type ScoredMinifiers = {
	minifiedWithScores: MinifierWithScore[];
	bestMinified?: BestMinifier;
	bestMinzipped?: BestMinifier;
	bestSpeed?: BestMinifier;
};

export type AnalyzedArtifact = Artifact & ScoredMinifiers;
export type AnalyzedDataEntry = [ArtifactName: string, AnalyzedArtifact];
export type AnalyzedData = AnalyzedDataEntry[];

// Dynamically adjust weights based on the time penalty
const baseTimeWeight = 0.15;
const weightSwing = 0.35;

const getRange = (numbers: number[]) => {
	const min = Math.min(...numbers);
	const max = Math.max(...numbers);
	const range = max - min;
	return {
		min,
		max,
		range,
	};
};

const getScoredMinifiers = (
	minified: [string, Minifier][],
): ScoredMinifiers => {
	// Filter out unsuccessful minifiers
	const successfulMinifiers = minified.flatMap(([name, minifier]): BestMinifier[] => {
		if ('error' in minifier.result) {
			return [];
		}
		return [[name, minifier] as BestMinifier];
	});

	// Find the best performers for each metric
	const bestMinified = minBy(successfulMinifiers, '1.result.data.minifiedBytes');
	const bestMinzipped = minBy(successfulMinifiers, '1.result.data.minzippedBytes');
	const bestSpeed = minBy(successfulMinifiers, '1.result.data.time');

	// Calculate the range of sizes and times for normalization
	const { min: minSize, range: sizeRange } = getRange(
		successfulMinifiers.map(([, m]) => m.result.data.minzippedBytes),
	);

	const { min: minTime, range: timeRange } = getRange(
		successfulMinifiers.map(([, m]) => m.result.data.time),
	);

	const times = successfulMinifiers.map(([, m]) => m.result.data.time).sort((a, b) => a - b);
	const medianTime = times.length % 2 === 0
		? (times[times.length / 2 - 1] + times[times.length / 2]) / 2
		: times[Math.floor(times.length / 2)];

	// Calculate the score for each minifier
	const minifiedWithScores = minified
		.map(([minifierName, minifier]) => {
			const { result } = minifier;
			let score;

			if ('error' in result) {
				score = Number.POSITIVE_INFINITY;
			} else {
				// Min-max normalization
				const normalizedSize = sizeRange ? (result.data.minzippedBytes - minSize) / sizeRange : 0;
				const normalizedTime = timeRange ? (result.data.time - minTime) / timeRange : 0;

				/**
				 * Calculates a time penalty factor using the logistic sigmoid function.
				 *
				 * The logarithmic ratio makes the penalty depend on relative speed, not milliseconds.
				 */
				const timeRatio = medianTime === 0 && result.data.time === 0
					? 1
					: result.data.time / medianTime;
				const timePenaltyFactor = 1 / (1 + Math.exp(-2 * Math.log2(timeRatio)));

				/**
				 * Dynamically increases the time weight based on how slow the minifier is,
				 * effectively adding a penalty for slowness. The weights sum to 1.
				 *
				 * If a minifier is fast (timePenaltyFactor ≈ 0):
				 * - Time is weighted lightly at its base value (0.15).
				 * - The final score is dominated by the normalized size.
				 *
				 * If a minifier is slow (timePenaltyFactor ≈ 1):
				 * - Time is weighted more heavily (up to 0.50).
				 * - The final score is significantly impacted by both size and time.
				 */
				const dynamicTimeWeight = baseTimeWeight + (weightSwing * timePenaltyFactor);

				score = ((1 - dynamicTimeWeight) * normalizedSize) + (dynamicTimeWeight * normalizedTime);
			}

			return {
				minifierName,
				minifier,
				score,
			};
		});

	minifiedWithScores.sort((a, b) => a.score - b.score);

	return {
		minifiedWithScores,
		bestMinified,
		bestMinzipped,
		bestSpeed,
	};
};

export const getAnalyzedData = (): AnalyzedData => {
	const artifacts = Object.entries(data);
	artifacts.sort((
		[, { size: sizeA }],
		[, { size: sizeB }],
	) => sizeA - sizeB);

	return artifacts.map(([name, artifact]) => [
		name,
		{

			...artifact,
			...getScoredMinifiers(Object.entries(artifact.minified)),
		},
	]);
};
