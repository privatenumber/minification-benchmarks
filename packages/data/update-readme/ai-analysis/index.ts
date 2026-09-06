import fs from 'node:fs/promises';
import { createGateway, generateText, Output } from 'ai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { AnalyzedData } from '../analyzed-data.ts';
import { getMessage } from './get-message.ts';
import { getAnalysisSchema } from './schema.ts';

const apiKey = process.env.VERCEL_AI_GATEWAY_API_KEY;
const gateway = createGateway({ apiKey });

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
	if (!apiKey) {
		console.warn('Skipping AI analysis due to missing VERCEL_AI_GATEWAY_API_KEY');
		return;
	}

	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = getMessage(minifiers, data);

	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;

	const { output } = await generateText({
		model: gateway('zai/glm-5.3-flash'),
		output: Output.object({
			schema: getAnalysisSchema(data.map(([artifactName]) => artifactName)),
		}),
		instructions: `${todaysDate}\n\n${systemPrompt}`,
		prompt: message,
	});

	return output;
};
