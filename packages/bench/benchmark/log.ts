import { getSize, getGzipSize } from '@minification-benchmarks/utils/get-size.ts';
import type {
	BenchmarkResultSuccess,
	BenchmarkError,
} from '../types.ts';
import type { Minified } from './types.ts';

export const logResult = (
	minified: Minified,
) => {
	const stringified: BenchmarkResultSuccess = {
		data: {
			minifiedBytes: getSize(minified.code),
			minzippedBytes: getGzipSize(minified.code),
			time: minified.time,
		},
	};
	console.log(JSON.stringify(stringified));
};

export const logError = (
	thrown: unknown,
	stage?: string,
) => {
	let error: BenchmarkError['error'];
	if (thrown instanceof Error) {
		const cwd = process.cwd();
		error = {
			message: thrown.message.replaceAll(cwd, ''),
			stack: thrown.stack!.replaceAll(cwd, ''),
		};
	} else {
		error = {
			message: JSON.stringify(thrown),
		};
	}

	if (stage) {
		error.stage = stage;
	}

	const stringified: BenchmarkError = { error };
	console.error(JSON.stringify(stringified));
	process.exit(1);
};
