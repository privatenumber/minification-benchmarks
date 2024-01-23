import path from 'path';
import _task, { type Task } from 'tasuku';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import type { Minifier } from '@minification-benchmarks/minifiers';
import { benchmarkMinifiers } from './benchmark-minifiers.js';
import type { BenchmarkedArtifact } from '../types';
import { setTimeout } from 'timers/promises';
import { loadArtifact } from '@minification-benchmarks/artifacts';
import byteSize from 'byte-size';

const cwd = process.cwd();

export const benchmarkArtifacts = async (
	artifacts: ArtifactLoaded[],
	minifiers: string[],
	task: Task = _task,
	sampleSize?: number,
	saveToDirectory?: string,
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
					saveToDirectory,
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
