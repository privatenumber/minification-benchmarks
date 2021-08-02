import assert from 'assert';
import { inspect } from 'util';
import minimist from 'minimist';
import task from 'tasuku';
import { getArtifacts } from '../lib/utils/get-artifacts';
import { getMinifiers } from '../lib/utils/get-minifiers';
import { benchmarkArtifacts } from '../lib/benchmark-artifacts';

(async () => {
	const argv = minimist(process.argv.slice(2));

	let artifacts = await getArtifacts();
	if (argv.artifact) {
		artifacts = artifacts.filter(artifact => artifact.moduleName.match(argv.artifact));
	}
	assert(artifacts.length, 'No artifacts matched');

	let minifiers = await getMinifiers();
	if (argv.minifier) {
		minifiers = minifiers.filter(minifier => minifier === argv.minifier);
	}
	assert(minifiers.length, 'No minifiers matched');

	const { results } = await benchmarkArtifacts(task, artifacts, minifiers);

	console.log(inspect(results, {
		colors: true,
		depth: null,
	}));
})();
