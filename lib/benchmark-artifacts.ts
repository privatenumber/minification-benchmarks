import path from 'path';
import { benchmarkMinifiers } from './benchmark-minifiers';
import type { Tasuku, Artifact, BenchmarkedArtifact } from './types';

export async function benchmarkArtifacts(
	task: Tasuku,
	artifacts: Artifact[],
	minifiers: string[],
	sampleSize = 1,
) {
	return await task.group(
		task => artifacts.map(
			artifact => task(
				`${artifact.moduleName} - ${path.relative(process.cwd(), artifact.modulePath)}`,
				async ({ task }): Promise<BenchmarkedArtifact> => {
					const benchmarkingTask = await benchmarkMinifiers(
						task,
						minifiers,
						artifact,
						sampleSize,
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
