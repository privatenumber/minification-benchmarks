import path from 'path';
import { benchmarkMinifiers } from './benchmark-minifiers';
import type { Tasuku, Artifact, BenchmarkedArtifact } from './types';

export async function benchmarkArtifacts(
	task: Tasuku,
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
