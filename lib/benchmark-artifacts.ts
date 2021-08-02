import path from 'path';
import task from 'tasuku';
import { benchmarkMinifiers } from './benchmark-minifiers';
import type { Artifact } from './types';

type Tasuku = typeof task;

export async function benchmarkArtifacts(
	task: Tasuku,
	artifacts: Artifact[],
	minifiers: string[],
) {
	return await task.group(
		task => artifacts.map(
			artifact => task(
				`${artifact.moduleName} - ${path.relative(process.cwd(), artifact.modulePath)}`,
				async ({ task }) => {
					const benchmarkingTask = await benchmarkMinifiers(
						task,
						minifiers,
						artifact,
					);
					benchmarkingTask.clear();

					return {
						artifact,
						minifierResults: benchmarkingTask.results,
					};
				},
			),
		),
	);
}
