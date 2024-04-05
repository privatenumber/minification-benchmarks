import _task, { type Task } from 'tasuku';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import byteSize from 'byte-size';
import { benchmarkMinifiers } from './benchmark-minifiers.js';
import type { MinifierInstance } from './types.js';

export const benchmarkArtifacts = async (
	artifacts: ArtifactLoaded[],
	minifiers: MinifierInstance[],
	task: Task = _task,
	sampleSize?: number,
) => await task.group(
	task => artifacts.map(
		artifact => task(
			artifact.name,
			async ({ task, setOutput }) => {
				setOutput(byteSize(artifact.size).toString());

				// setStatus(path.relative(cwd, artifact.filePath));

				const benchmarkResults = await benchmarkMinifiers(
					artifact,
					minifiers,
					task,
					sampleSize,
				);

				// console.log(benchmarkResults);
				benchmarkResults.clear();

				// return {
				// 	artifact,
				// 	benchmarkResults: benchmarkResults.map(task => task.result),
				// } as BenchmarkedArtifact;
			},
		),
	),
);
