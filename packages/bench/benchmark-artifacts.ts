import path from 'path';
import _task, { type Task } from 'tasuku';
import type { Artifact } from '@minification-benchmarks/artifacts';
import { benchmarkMinifiers } from './benchmark-minifiers';
import type { BenchmarkedArtifact } from './types';

export const benchmarkArtifacts = async (
	artifacts: string[],
	minifiers: string[],
	task: Task = _task,
	sampleSize?: number,
	saveToDirectory?: string,
) => await task.group(
	task => artifacts.map(
		artifact => task(
			artifact.packageName,
			async ({ task, setStatus }) => {
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
				} as BenchmarkedArtifact;
			},
		),
	),
);
