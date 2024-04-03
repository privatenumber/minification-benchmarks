import { getSize, getGzipSize } from '@minification-benchmarks/utils/get-size.js';
import type {
	BenchmarkResultSuccess,
	BenchmarkError,
} from '../types.js';
import type { Minified } from './types.js';

export const logResult = (
	minified: Minified,
) => {
	const stringified: BenchmarkResultSuccess = {
		result: {
			minifiedSize: getSize(minified.code),
			minzippedSize: getGzipSize(minified.code),
			time: minified.time,
		},
	};
	console.log(JSON.stringify(stringified));
};

export const logError = (
	thrown: unknown,
	context?: string,
) => {
	let error: BenchmarkError['error'];
	if (thrown instanceof Error) {
		error = {
			message: thrown.message,
			stack: thrown.stack,
		};
	} else {
		error = {
			message: JSON.stringify(thrown),
		};
	}

	if (context) {
		error.context = context;
	}

	const stringified: BenchmarkError = { error };
	console.error(JSON.stringify(stringified));
	process.exit(1);
};
