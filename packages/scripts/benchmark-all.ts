import assert from 'assert';
import { inspect } from 'util';
import { cli } from 'cleye';
import task from 'tasuku';
import { benchmarkArtifacts } from '@minification-benchmarks/bench/benchmark-artifacts';
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

(async () => {

	const {
		artifact: filterArtifacts,
		minifier: filterMinifier,
	} = argv.flags;

	let artifactNames = await getArtifacts();
	if (filterArtifacts) {
		artifactNames = artifactNames.filter(artifact => artifact.match(filterArtifacts));
	}
	assert(artifactNames.length, 'No artifacts matched');

	const artifacts = await Promise.all(
		artifactNames.map((artifact) => loadArtifact(artifact))
	);
	
	let minifierNames = await getMinifiers();
	if (filterMinifier) {
		minifierNames = minifierNames.filter(minifier => minifier.match(filterMinifier));
	}
	assert(minifierNames.length, 'No minifiers matched');

	const minifiers = await Promise.all(
		minifierNames.map((minifier) => loadMinifier(minifier))
	);
	
	// const results = await benchmarkArtifacts(
	// 	artifacts,
	// 	minifiers,
	// );

	// console.log(inspect(results, {
	// 	colors: true,
	// 	depth: null,
	// }));
})();
