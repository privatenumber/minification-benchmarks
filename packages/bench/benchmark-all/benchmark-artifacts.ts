import _task, { type Task } from 'tasuku';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import byteSize from 'byte-size';
import { benchmarkMinifiers } from './benchmark-minifiers.js';
import type { MinifierInstance } from './types.js';

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
				setOutput(byteSize(artifact.size).toString());

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
