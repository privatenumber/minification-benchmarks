import assert from 'assert';
import { cli } from 'cleye';
import { getArtifacts, loadArtifact } from '@minification-benchmarks/artifacts';
import { getMinifiers, loadMinifier } from '@minification-benchmarks/minifiers';
import { benchmarkArtifacts } from './benchmark-artifacts';
import type { MinifierInstance } from './types.js';

const argv = cli({
	name: 'benchmark-all',
	flags: {
		artifact: {
			type: String,
			alias: 'a',
			description: 'Filter artifacts by name',
		},
		minifier: {
			type: String,
			alias: 'm',
			description: 'Filter minifiers by name',
		},
	},
});

const loadArtifacts = async (
	filter?: string,
) => {
	let artifactNames = await getArtifacts();
	if (filter) {
		artifactNames = artifactNames.filter(artifact => artifact.match(filter));
	}
	assert(artifactNames.length, 'No artifacts matched');

	const artifacts = await Promise.all(artifactNames.map(loadArtifact));

	artifacts.sort((a, b) => a.size - b.size);

	return artifacts;
};

const loadMinifiers = async (
	filter?: string,
) => {
	const minifierNames = await getMinifiers();
	const minifiers = await Promise.all(minifierNames.map(loadMinifier));

	let minifierInstances = minifiers.flatMap(
		minifier => (
			Object.keys(minifier.instances)
				.map((instance): MinifierInstance => ({
					minifier,
					instance,
				}))
		),
	);

	if (filter) {
		minifierInstances = minifierInstances.filter(({ minifier, instance }) => (
			minifier.name.match(filter)
			|| instance.match(filter)
		));
	}

	assert(minifierInstances.length, 'No minifiers matched');

	return minifierInstances;
};

(async () => {
	process.stdin.on('data', () => {
		process.exit();
	});

	const {
		artifact: filterArtifacts,
		minifier: filterMinifier,
	} = argv.flags;

	const artifacts = await loadArtifacts(filterArtifacts);
	const minifiers = await loadMinifiers(filterMinifier);

	// console.dir(minifiers, { colors: true, depth: null, maxArrayLength: null });
	const results = await benchmarkArtifacts(
		artifacts,
		minifiers,
	);

	// console.log(inspect(results, {
	// 	colors: true,
	// 	depth: null,
	// }));
})();
