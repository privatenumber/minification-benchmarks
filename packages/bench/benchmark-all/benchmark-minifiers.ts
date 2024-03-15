import path from 'path';
import fs from 'fs/promises';
import byteSize from 'byte-size';
import _task, { type Task } from 'tasuku';
import { percent, formatMs } from '@minification-benchmarks/utils/formatting';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type {
	MinifierResult,
	BenchmarkData,
	BenchmarkResult,
	BenchmarkResultSuccess,
} from '../types';
import { benchmark } from './benchmark';
import { setTimeout } from 'timers/promises';

const getAverage = (numbers: number[]) => (
	numbers.reduce(
		(sum, next) => sum + next,
		0,
	) / numbers.length
);

const runMultiple = async (
	minifierName: string,
	artifactName: string,
	n: number,
) => {
	const results: BenchmarkResultSuccess[] = [];
	for (let i = 0; i < n; i += 1) {
		// const outputPath = path.resolve(saveToDirectory, `${artifactName}-${minifierName}-${i}.js`);
		const result = await benchmark(
			minifierName,
			artifactName,
			// outputPath,
		);

		if ('error' in result) {
			return result;
		}

		results.push(result);
	}
	
	const averageTime = getAverage(results.map(({ result }) => result.time));
	return {
		result: {
			...results[0].result,
			time: averageTime,
		},
	};
};


const benchmarkTime = Date.now();

const cache = {
	['artifact-version-contentHash']: {
		['minifier-version']: {
			date: '',
			minifiedSize: 0,
			minzippedSize: 0,
			time: 0,
		}
	},
};


export const benchmarkMinifiers = async (
	artifact: ArtifactLoaded,
	minifiers: MinifierLoaded[],
	task: Task,
	sampleSize = 1,
	saveToDirectory = `results/benchmarks-${benchmarkTime}`,
) => task.group(
	task => minifiers.flatMap(
		(minifier) => Object.entries(minifier.instances).map(([minifierInstance, minifierFn]) => task(
			minifier.name === minifierInstance ? minifierInstance : `${minifier.name}: ${minifierInstance}`,
			async ({
				setStatus,
				setOutput,
				setError,
			}) => {
				console.log(artifact.cacheKey(), minifier.name, minifierInstance);
				await setTimeout(3000);
				// Here we want to cache the result
				// const cacheKey = hash(artifact);

				// const result = await runMultiple(
				// 	minifier,
				// 	artifact.name,
				// 	sampleSize,
				// );

				// if ('error' in result) {
				// 	setError(`${result.error.context ? `[${result.error.context}]` : ''} ${result.error.message}`);
				// 	return;
				// }

				// setOutput(
				// 	`${byteSize(result.result.minifiedSize)} (${percent(artifact.size, result.result.minifiedSize)})`,
				// );
				// console.log(result);


				// const runs: BenchmarkData[] = [];
				// let averageTime = 0;

				// for (let i = 1; i <= sampleSize; i += 1) {
				// 	const outputPath = path.resolve(saveToDirectory, `${artifact.packageName}-${minifierName}.js`);
				// 	const result = await benchmark(
				// 		minifierName,
				// 		artifact.fullModulePath,
				// 		artifact.testPath,
				// 		outputPath,
				// 	);

				// 	if (!result) {
				// 		const error = 'No result';
				// 		setError(error);
				// 		return {
				// 			name: minifierName,
				// 			error,
				// 		};
				// 	}

				// 	if ('error' in result) {
				// 		setError(result.error);
				// 		return {
				// 			name: minifierName,
				// 			error: result.error,
				// 		};
				// 	}

				// 	runs.push(result.data);

				// 	setOutput(
				// 		`${byteSize(artifact.size)} → ${byteSize(result.data.minifiedSize)} (${percent(artifact.size, result.data.minifiedSize)})`,
				// 	);

				// 	averageTime = getAverage(runs.map(({ time }) => time));
				// 	setStatus(`Average speed: ${formatMs(averageTime)} / ${runs.length} runs`);
				// }

				// const [firstRun] = runs;
				// const raw = {
				// 	minifiedSize: firstRun.minifiedSize,
				// 	minzippedSize: firstRun.minzippedSize,
				// 	averageTime,
				// };
				// const formatted = {
				// 	minifiedSize: byteSize(raw.minifiedSize).toString(),
				// 	minzippedSize: byteSize(raw.minzippedSize).toString(),
				// 	averageTime: formatMs(raw.averageTime),
				// };

				// return {
				// 	name: minifierName,
				// 	data: {
				// 		raw,
				// 		formatted,
				// 	},
				// 	runs,
				// };
			},
		)),
	),
);