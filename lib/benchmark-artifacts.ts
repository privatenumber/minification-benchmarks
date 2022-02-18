import path from 'path';
import { benchmarkMinifiers } from './benchmark-minifiers';
import type { Artifact, BenchmarkedArtifact } from './types';
import type { Task } from 'tasuku';

export async function benchmarkArtifacts(
	task: Task,
	artifacts: Artifact[],
	minifiers: string[],
	sampleSize?: number,
	saveToDirectory?: string,
) {
	return await task.group(
		task => artifacts.map(
			artifact => task(
				artifact.packageName,
				async ({ task, setStatus }): Promise<BenchmarkedArtifact> => {
					setStatus(path.relative('node_modules', artifact.fullModulePath));

					const benchmarkingTask = await benchmarkMinifiers(
						task,
						minifiers,
						artifact,
						sampleSize,
						saveToDirectory,
					);

					benchmarkingTask.clear();

					return {
						artifact,
						benchmarkResults: benchmarkingTask.results,
					};
				},
			),
		),
	);
}
