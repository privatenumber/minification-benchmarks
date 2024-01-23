import assert from 'assert';
import { cli } from 'cleye';
import task from 'tasuku';
import { benchmarkArtifacts } from './benchmark-artifacts';
import { getArtifacts, loadArtifact } from '@minification-benchmarks/artifacts';
import { getMinifiers, loadMinifier } from '@minification-benchmarks/minifiers';

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
	let minifierNames = await getMinifiers();
	if (filter) {
		minifierNames = minifierNames.filter(minifier => minifier.match(filter));
	}
	assert(minifierNames.length, 'No minifiers matched');

	const minifiers = await Promise.all(minifierNames.map(loadMinifier));

	return minifiers;
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

	let minifiers = await loadMinifiers(filterMinifier);
	
	const results = await benchmarkArtifacts(
		artifacts,
		minifiers,
	);

	// console.log(inspect(results, {
	// 	colors: true,
	// 	depth: null,
	// }));
})();
