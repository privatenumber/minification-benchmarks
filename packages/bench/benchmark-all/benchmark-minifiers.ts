import _task, { type Task } from 'tasuku';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import type { MinifierInstance } from './types.js';
import type {
	MinifierResult,
	BenchmarkData,
	BenchmarkResult,
	BenchmarkResultSuccess,
} from '../types';
import { benchmarkAverage } from './benchmark.js';
import { setTimeout } from 'timers/promises';
import { hasResults, saveResults } from '@minification-benchmarks/data';

export const benchmarkMinifiers = async (
	artifact: ArtifactLoaded,
	minifiers: MinifierInstance[],
	task: Task,
	sampleSize = 1,
) => task.group(
	task => minifiers.flatMap(
		(minifier) => task(
			minifier.minifier.name + (minifier.instance === 'default' ? '' : ` (${minifier.instance})`),
			async ({
				setStatus,
				setOutput,
				setError,
			}) => {
				if (hasResults(artifact, minifier.minifier, minifier.instance)) {
					return;
				}

				const result = await benchmarkAverage(
					artifact.name,
					minifier.minifier.id!,
					minifier.instance,
					sampleSize,
				);

				await saveResults(artifact, minifier.minifier, minifier.instance, result);
			},
		),
	),
);