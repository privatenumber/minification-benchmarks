import fs from 'node:fs/promises';
import OpenAI from 'openai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { AnalyzedData } from '../analyzed-data.js';
import { getMessage } from './get-message.js';

const apiKey = process.env.GH_TOKEN;

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = await getMessage(minifiers, data);

	if (!apiKey) {
		return;
	}

	const systemPromptWithDate = `${todaysDate}\n\n${systemPrompt}`;

	const client = new OpenAI({
		baseURL: 'https://models.inference.ai.azure.com',
		apiKey,
	});
	const response = await client.chat.completions.create({
		model: 'gpt-5-mini',
		messages: [
			{
				role: 'system',
				content: systemPromptWithDate,
			},
			{
				role: 'user',
				content: message,
			},
		],
	});

	let analysis = response.choices[0].message.content!;
	analysis = analysis.replaceAll('\n---\n', '');
	return {
		systemPrompt: `${systemPromptWithDate}\n\n${message}`,
		analysis,
	};
};
