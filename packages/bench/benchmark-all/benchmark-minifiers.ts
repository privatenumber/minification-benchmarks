import { setTimeout } from 'timers/promises';
import _task, { type Task } from 'tasuku';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import { hasResults, saveResults } from '@minification-benchmarks/data';
import type {
	MinifierResult,
	BenchmarkData,
	BenchmarkResult,
	BenchmarkResultSuccess,
} from '../types';
import type { MinifierInstance } from './types.js';
import { benchmarkAverage } from './benchmark.js';

export const benchmarkMinifiers = async (
	artifact: ArtifactLoaded,
	minifiers: MinifierInstance[],
	task: Task,
	sampleSize = 1,
) => task.group(
	task => minifiers.flatMap(
		minifier => task(
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
