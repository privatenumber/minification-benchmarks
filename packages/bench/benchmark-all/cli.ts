import assert from 'assert';
import { cli } from 'cleye';
import { getArtifacts, loadArtifact } from '@minification-benchmarks/artifacts';
import { getMinifiers } from '@minification-benchmarks/minifiers';
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
		runs: {
			type: Number,
			alias: 'r',
			default: 5,
			description: 'Number of runs per benchmark',
		},
		force: {
			type: Boolean,
			alias: 'f',
			description: 'Re-run minifiers and overwrite existing results',
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
	const minifiers = await getMinifiers();

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
		runs,
		force,
	} = argv.flags;

	const artifacts = await loadArtifacts(filterArtifacts);
	const minifiers = await loadMinifiers(filterMinifier);

	await benchmarkArtifacts(
		artifacts,
		minifiers,
		runs,
		force,
	);

	process.exit();
})();
