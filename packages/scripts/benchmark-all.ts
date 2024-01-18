import assert from 'assert';
import { inspect } from 'util';
import { cli } from 'cleye';
import task from 'tasuku';
import { benchmarkArtifacts } from '@minification-benchmarks/bench/benchmark-artifacts';
import { getArtifacts } from '@minification-benchmarks/artifacts';
import { getMinifiers } from '@minification-benchmarks/minifiers';

(async () => {
	const argv = cli({
		name: 'benchmark-all',
		flags: {
			artifact: {
				type: String,
				alias: 'a',
				description: 'Artifact name to filter all artifacts by',
			},
			minifier: {
				type: String,
				alias: 'm',
				description: 'Minifier to benchmark. Options in `lib/minifiers`',
			},
		},
	});

	let artifacts = await getArtifacts();

	const {
		artifact: artifactName,
		minifier: minifierName,
	} = argv.flags;

	if (artifactName) {
		artifacts = artifacts.filter(artifact => artifact.packageName.match(artifactName));
	}

	assert(artifacts.length, 'No artifacts matched');

	let minifiers = await getMinifiers();

	if (minifierName) {
		minifiers = minifiers.filter(minifier => minifier === minifierName);
	}

	assert(minifiers.length, 'No minifiers matched');

	const results = await benchmarkArtifacts(task, artifacts, minifiers);

	console.log(inspect(results, {
		colors: true,
		depth: null,
	}));
})();