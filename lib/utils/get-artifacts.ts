import artifactPaths from '../artifacts';
import { getArtifact } from './get-artifact';

export const getArtifacts = async () => {
	const artifacts = await Promise.all(artifactPaths.map(
		async filePath => await getArtifact(filePath),
	));

	artifacts.sort(
		(a, b) => a.moduleName.localeCompare(b.moduleName),
	);

	return artifacts;
};
