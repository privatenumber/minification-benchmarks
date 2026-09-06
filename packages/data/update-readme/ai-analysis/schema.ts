import { z } from 'zod';

export type AiAnalysis = {
	intro: string;
	rounds: Record<string, string>;
	conclusion: string;
};

/**
 * The commentary contract: one generation must produce an intro, non-empty
 * commentary for every artifact, and a conclusion — so an incomplete
 * generation fails validation instead of rendering an incomplete README.
 */
export const getAnalysisSchema = (artifactNames: readonly string[]) => {
	const commentary = z.string().trim().min(1);

	return z.object({
		intro: commentary,
		rounds: z.object(
			Object.fromEntries(artifactNames.map(artifactName => [artifactName, commentary])),
		).strict(),
		conclusion: commentary,
	}).strict();
};
