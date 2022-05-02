import path from 'path';
import type { Task } from 'tasuku';
import { benchmarkMinifiers } from './benchmark-minifiers';
import type { Artifact, BenchmarkedArtifact } from './types';

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

					const benchmarkResults = await benchmarkMinifiers(
						task,
						minifiers,
						artifact,
						sampleSize,
						saveToDirectory,
					);

					benchmarkResults.clear();

					return {
						artifact,
						benchmarkResults: benchmarkResults.map(task => task.result),
					};
				},
			),
		),
	);
}
