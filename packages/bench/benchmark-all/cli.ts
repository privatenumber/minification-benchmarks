import assert from 'assert';
import { cli } from 'cleye';
import { getArtifacts, loadArtifact } from '@minification-benchmarks/artifacts';
import { getMinifiers } from '@minification-benchmarks/minifiers';
import { saveData } from '@minification-benchmarks/data';
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
		sort: {
			type: Boolean,
			alias: 's',
			description: 'Re-sort data',
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
	assert.ok(artifactNames.length, 'No artifacts matched');

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

	assert.ok(minifierInstances.length, 'No minifiers matched');

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
		sort,
	} = argv.flags;

	const artifacts = await loadArtifacts(filterArtifacts);
	const minifiers = await loadMinifiers(filterMinifier);

	await benchmarkArtifacts(
		artifacts,
		minifiers,
		runs,
		force,
	);

	if (sort) {
		await saveData(true);
	}

	process.exit();
})();
