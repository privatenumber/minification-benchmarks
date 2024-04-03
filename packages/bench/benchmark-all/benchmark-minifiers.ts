import path from 'path';
import fs from 'fs/promises';
import byteSize from 'byte-size';
import _task, { type Task } from 'tasuku';
import { percent, formatMs } from '@minification-benchmarks/utils/formatting';
import type { ArtifactLoaded } from '@minification-benchmarks/artifacts';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { MinifierInstance } from './types.js';
import type {
	MinifierResult,
	BenchmarkData,
	BenchmarkResult,
	BenchmarkResultSuccess,
} from '../types';
import { benchmarkAverage } from './benchmark';
import { setTimeout } from 'timers/promises';

type MinfierResult = {
	date: string;
	minifiedSize: number;
	minzippedSize: number;
	time: number;
};

type ArtifactResult = {
	[minifierName: string]: MinfierResult;
};

type Cache = { [id: string]: ArtifactResult };

const data: Cache = {
	'artifact': {
		'minifier-name-version': {
			date: '',
			minifiedSize: 0,
			minzippedSize: 0,
			time: 0,
		},
	},
};

export const benchmarkMinifiers = async (
	artifact: ArtifactLoaded,
	minifiers: MinifierInstance[],
	task: Task,
	sampleSize = 1,
) => task.group(
	task => minifiers.flatMap(
		(minifier) => task(
			minifier.minifier.name + (minifier.instance === 'default' ? '' : ` (${minifier.instance})`),
			async ({
				setStatus,
				setOutput,
				setError,
			}) => {
				const artifactId = `${artifact.name}-${artifact.packageJson.version}-${artifact.contentHash()}`;
				let artifactEntry = data[artifactId];

				if (!artifactEntry) {
					artifactEntry = {};
					data[artifactId] = artifactEntry;
				}

				const minifierId = `${minifier.instance}-${minifier.minifier.meta.version}`;

				let minifierEntry = artifactEntry[minifierId];
				if (minifierEntry) {
					// Cache hit
					return;
					// minifierEntry = {
					// 	date: '',
					// 	minifiedSize: 0,
					// 	minzippedSize: 0,
					// 	time: 0,
					// };
					// artifactEntry[minifierId] = minifierEntry;
				}



				console.dir(minifier, { colors: true, depth: null, maxArrayLength: null });

				// let minifierResult = cacheEntry[minifierInstance.name];
				// if (!minifierResult) {
					const result = await benchmarkAverage(
						artifact.name,
						minifier.minifier.name,
						minifier.instance,
						sampleSize,
					);

					console.log(result);
				// }
				// await setTimeout(1000);

				// console.log(artifact.cacheKey(), minifier.name, minifierInstance);
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
		),
	),
);