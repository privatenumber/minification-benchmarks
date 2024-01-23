import fs from 'fs/promises';
import assert from 'assert';
import { cli } from 'cleye';
import type {
	BenchmarkResultSuccess,
	BenchmarkData,
	BenchmarkError,
} from './types.js';
import { getSize, getGzipSize } from '@minification-benchmarks/utils/get-size.js';
import { loadMinifier, type Minifier } from '@minification-benchmarks/minifiers';
import { loadArtifact } from '@minification-benchmarks/artifacts';

type Minified = {
	code: string;
	time: number;
};

const logResult = (
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

const logError = (
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

const runMinifier = async (
	minifier: Minifier,
	code: string,
	filePath: string,
): Promise<Minified> => {
	const startTime = process.hrtime();
	let minifiedCode: string;
	try {
		minifiedCode = await minifier.minify({
			code,
			filePath,
		});
	} catch (error) {
		return logError(error, 'minification');
	}

	const elapsed = process.hrtime(startTime);
	return {
		code: minifiedCode,
		time: (elapsed[0] * 1000) + (elapsed[1] / 1e6),
	};
};

const argv = cli({
	name: 'benchmark',

	flags: {
		minifier: {
			type: String,
			alias: 'm',
			description: 'Minifier name from lib/minifiers',
		},

		artifact: {
			type: String,
			alias: 'a',
			description: 'Artifact name from lib/artifacts',
		},

		outputPath: {
			type: String,
			alias: 'o',
			description: 'Output path for minified code',
		},
	},
});

const {
	minifier: minifierName,
	artifact: artifactName,
	outputPath,
} = argv.flags;

assert(minifierName, 'Minifier must be passed in');
assert(artifactName, 'Artifact must be passed in');

const minifier = await loadMinifier(minifierName);
const artifact = await loadArtifact(artifactName);

try {
	await artifact.validate();
} catch (error) {
	logError(error, 'pre-minification');
}

const minified = await runMinifier(minifier, artifact.code!, artifact.filePath);

try {
	await artifact.validate(minified.code);
} catch (error) {
	logError(error, 'post-minification');
}

logResult(minified);

if (outputPath) {
	await fs.writeFile(outputPath, minified.code);
}
