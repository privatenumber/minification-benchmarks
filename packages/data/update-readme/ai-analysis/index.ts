import fs from 'node:fs/promises';
import { createGateway, generateText } from 'ai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { AnalyzedData } from '../analyzed-data.ts';
import { getMessage } from './get-message.ts';

const apiKey = process.env.VERCEL_AI_GATEWAY_API_KEY;
const gateway = createGateway({ apiKey });

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = await getMessage(minifiers, data);

	if (!apiKey) {
		console.warn('Skipping AI analysis due to missing VERCEL_AI_GATEWAY_API_KEY');
		return;
	}

	const systemPromptWithDate = `${todaysDate}\n\n${systemPrompt}`;

	const { text } = await generateText({
		model: gateway('zai/glm-5.3-flash'),
		instructions: systemPromptWithDate,
		prompt: message,
	});

	return {
		systemPrompt: `${systemPromptWithDate}\n\n${message}`,
		analysis: text.replaceAll('\n---\n', ''),
	};
};
