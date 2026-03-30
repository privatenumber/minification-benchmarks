import type { Artifact } from '../types.ts';

export const sortArtifacts = (
	[, a]: [unknown, Artifact],
	[, b]: [unknown, Artifact],
) => a.size - b.size;

export const sortMinifiers = (
	[nameA]: [string, unknown],
	[nameB]: [string, unknown],
) => nameA.localeCompare(nameB);
