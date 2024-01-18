import { Artifact } from './artifact.js';

export type ArtifactMeta = {
	package: string;
	filePath: string;
};

export const defineArtifact = (
	artifactMeta: ArtifactMeta,
) => new Artifact(artifactMeta);
