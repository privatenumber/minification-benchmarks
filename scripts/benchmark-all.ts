import assert from 'assert';
import { inspect } from 'util';
import typeFlag from 'type-flag';
import task from 'tasuku';
import { getArtifacts } from '../lib/get-artifacts';
import { getMinifiers } from '../lib/utils/get-minifiers';
import { benchmarkArtifacts } from '../lib/benchmark-artifacts';

(async () => {
	const argv = typeFlag(process.argv.slice(2), {
		artifact: {
			type: String,
			alias: 'a',
		},
		minifier: {
			type: String,
			alias: 'm',
		},
	});

	let artifacts = await getArtifacts();

	const [artifactName] = argv.flags.artifact;
	if (artifactName) {
		artifacts = artifacts.filter(artifact => artifact.packageName.match(artifactName));
	}

	assert(artifacts.length, 'No artifacts matched');

	let minifiers = await getMinifiers();

	const [minifierName] = argv.flags.minifier;
	if (minifierName) {
		minifiers = minifiers.filter(minifier => minifier === minifierName);
	}

	assert(minifiers.length, 'No minifiers matched');

	const { results } = await benchmarkArtifacts(task, artifacts, minifiers);

	console.log(inspect(results, {
		colors: true,
		depth: null,
	}));
})();
