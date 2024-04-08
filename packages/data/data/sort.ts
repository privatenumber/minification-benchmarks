import type { Artifact, Minifier } from '../types.js';

export const sortArtifacts = (
	[, a]: [unknown, Artifact],
	[, b]: [unknown, Artifact],
) => a.size - b.size;

export const sortMinifiers = (
	[, a]: [unknown, Minifier],
	[, b]: [unknown, Minifier],
) => {
	if (
		'error' in a.result
		&& 'error' in b.result
	) {
		if (a.result.error.message === b.result.error.message) {
			return 0;
		}
		return a.result.error.message < b.result.error.message ? 1 : -1;
	}
	if ('error' in a.result) { return 1; }
	if ('error' in b.result) { return -1; }
	return a.result.data.minzippedSize - b.result.data.minzippedSize;
};
