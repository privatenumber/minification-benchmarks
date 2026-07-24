import fs from 'node:fs/promises';
import { generateText } from 'ai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { AnalyzedData } from '../analyzed-data.ts';
import { getMessage } from './get-message.ts';

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = await getMessage(minifiers, data);

	if (!process.env.AI_GATEWAY_API_KEY) {
		console.warn('Skipping AI analysis due to missing AI_GATEWAY_API_KEY');
		return;
	}

	const systemPromptWithDate = `${todaysDate}\n\n${systemPrompt}`;

	const { text } = await generateText({
		model: 'openai/gpt-5-mini',
		instructions: systemPromptWithDate,
		prompt: message,
	});

	return {
		systemPrompt: `${systemPromptWithDate}\n\n${message}`,
		analysis: text.replaceAll('\n---\n', ''),
	};
};
