import { z } from 'zod';

export type AiAnalysis = {
	intro: string;
	rounds: Record<string, string>;
	conclusion: string;
};

const commentary = z.string().trim().min(1);

export const commentarySchema = z.object({
	commentary,
}).strict();

export const overviewSchema = z.object({
	intro: commentary,
	conclusion: commentary,
}).strict();
