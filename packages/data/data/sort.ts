import type { Artifact } from '../types.js';

export const sortArtifacts = (
	[, a]: [unknown, Artifact],
	[, b]: [unknown, Artifact],
) => a.size - b.size;

export const sortMinifiers = (
	[nameA]: [string],
	[nameB]: [string],
) => nameA.localeCompare(nameB);
