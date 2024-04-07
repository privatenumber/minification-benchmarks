import _task, { type Task } from 'tasuku';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import { hasResults, saveResults } from '@minification-benchmarks/data';
import type { MinifierInstance } from './types.js';
import { benchmarkAverage } from './benchmark.js';

export const benchmarkMinifiers = async (
	artifact: ArtifactLoaded,
	minifiers: MinifierInstance[],
	sampleSize: number,
	task: Task,
	force?: boolean,
) => task.group(
	task => minifiers.flatMap(
		minifier => task(
			minifier.minifier.name + (minifier.instance === 'default' ? '' : ` (${minifier.instance})`),
			async ({ setStatus }) => {
				if (
					!force && hasResults(artifact, minifier.minifier, minifier.instance)
				) {
					return;
				}

				const result = await benchmarkAverage(
					artifact.name,
					minifier.minifier.minifierPath!,
					minifier.instance,
					sampleSize,
					setStatus,
				);

				await saveResults(artifact, minifier.minifier, minifier.instance, result);
			},
		),
	),
);
