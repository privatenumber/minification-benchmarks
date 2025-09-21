import fs from 'fs/promises';
import path from 'path';
import assert from 'assert';
import { cli } from 'cleye';
import { getMinifier, type MinifierFunction } from '@minification-benchmarks/minifiers';
import { loadArtifact } from '@minification-benchmarks/artifacts';
import { logResult, logError } from './log.js';
import type { Minified } from './types.js';

// In case 'node:assert' is used by the artifact tests
process.env.NO_COLOR = '1';

const runMinifier = async (
	minifier: MinifierFunction,
	code: string,
	filePath: string,
): Promise<Minified> => {
	const startTime = process.hrtime();
	let minifiedCode: string;
	try {
		minifiedCode = await minifier({
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

		instance: {
			type: String,
			alias: 'i',
			description: 'Minifier instance',
		},

		artifact: {
			type: String,
			alias: 'a',
			description: 'Artifact name from lib/artifacts',
		},

		save: {
			type: Boolean,
			alias: 's',
			description: 'Save minified code',
		},
	},
});

const {
	minifier: minifierName,
	artifact: artifactName,
	save,
} = argv.flags;

assert.ok(artifactName, 'Artifact must be passed in');
const artifact = await loadArtifact(artifactName);

assert.ok(minifierName, 'Minifier must be passed in');
const minifier = await getMinifier(minifierName);

const minifierInstanceName = argv.flags.instance;

const minifierInstances = Object.keys(minifier.instances);
let minifierInstance: MinifierFunction;
if (minifierInstances.length === 1) {
	minifierInstance = minifier.instances[minifierInstances[0]];
} else {
	assert.ok(minifierInstanceName, 'Minifier has multiple instances. Specify via --instance');
	minifierInstance = minifier.instances[minifierInstanceName];
}

try {
	await artifact.validate();
} catch (error) {
	logError(error, 'pre-validation');
}

const minified = await runMinifier(minifierInstance, artifact.code!, artifact.fullFilePath);

try {
	await artifact.validate(minified.code);
} catch (error) {
	logError(error, 'post-validation');
}

logResult(minified);

if (save) {
	const saveToDirectory = path.join('results', artifact.name, minifier.name);
	const saveTo = path.join(saveToDirectory, `${Date.now()}.js`);

	await fs.mkdir(saveToDirectory, { recursive: true });
	await fs.writeFile(saveTo, minified.code);

	// console.log(`Saved to ${saveTo}`);
}
