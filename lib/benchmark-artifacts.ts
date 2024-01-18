import path from 'path';
import type { Task } from 'tasuku';
import type { Artifact } from '@minification-benchmarks/artifacts';
import { benchmarkMinifiers } from './benchmark-minifiers';
import type { BenchmarkedArtifact } from './types';

export const benchmarkArtifacts = async (
	task: Task,
	artifacts: Artifact[],
	minifiers: string[],
	sampleSize?: number,
	saveToDirectory?: string,
) => await task.group(
	task => artifacts.map(
		artifact => task(
			artifact.packageName,
			async ({ task, setStatus }): Promise<BenchmarkedArtifact> => {
				setStatus(path.relative('node_modules', artifact.fullModulePath));

				const benchmarkResults = await benchmarkMinifiers(
					task,
					minifiers,
					artifact,
					sampleSize,
					saveToDirectory,
				);

				console.log(benchmarkResults);
				benchmarkResults.clear();

				return {
					artifact,
					benchmarkResults: benchmarkResults.map(task => task.result),
				};
			},
		),
	),
);
