import fs from 'fs/promises';
import assert from 'assert';
import { cli } from 'cleye';
import type { BenchmarkData } from '@minification-benchmarks/bench/types';
import { getSize, getGzipSize } from '@minification-benchmarks/utils/get-size.js';
import { loadMinifier, type MinifierFunction } from '@minification-benchmarks/minifiers';
import { loadArtifact } from '@minification-benchmarks/artifacts';

const runMinifier = async (
	minifier: MinifierFunction,
	code: string,
	filePath: string,
) => {
	const startTime = process.hrtime();
	let minifiedCode: string;
	try {
		minifiedCode = await minifier({
			code,
			filePath,
		});
	} catch (error) {
		throw new Error(`Failed to minify: ${
			error instanceof Error
				? error.message
				: JSON.stringify(error)
		}`);
	}
	
	const elapsed = process.hrtime(startTime);
	return {
		code: minifiedCode,
		time: (elapsed[0] * 1000) + (elapsed[1] / 1e6),
	};
};

const argv = cli({
	name: 'benchmark',

	parameters: ['<artifact>'],

	flags: {
		minifier: {
			type: String,
			alias: 'm',
			description: 'Minifier name from lib/minifiers',
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
	outputPath,
} = argv.flags;

assert(minifierName, 'Minifier name must be passed in');

const minifier = await loadMinifier(minifierName);
const artifact = await loadArtifact(argv._.artifact);

artifact.validate();

const minified = await runMinifier(minifier, artifact.code!, artifact.filePath);

artifact.validate(minified.code);

console.log(JSON.stringify({
	minifiedSize: getSize(minified.code),
	minzippedSize: getGzipSize(minified.code),
	time: minified.time,
} satisfies BenchmarkData));

if (outputPath) {
	await fs.writeFile(outputPath, minified.code);
}
