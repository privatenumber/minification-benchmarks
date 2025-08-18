import _task, { type Task } from 'tasuku';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import { benchmarkMinifiers } from './benchmark-minifiers.js';
import type { MinifierInstance } from './types.js';

const byteFormatter = new Intl.NumberFormat('en', {
	notation: 'compact',
	compactDisplay: 'short',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const benchmarkArtifacts = async (
	artifacts: ArtifactLoaded[],
	minifiers: MinifierInstance[],
	sampleSize: number,
	force: boolean | undefined,
	task: Task = _task,
) => await task.group(
	task => artifacts.map(
		artifact => task(
			artifact.name,
			async ({ task, setOutput }) => {
				setOutput(byteFormatter.format(artifact.size).toString());

				const benchmarkResults = await benchmarkMinifiers(
					artifact,
					minifiers,
					sampleSize,
					task,
					force,
				);

				benchmarkResults.clear();
			},
		),
	),
);
