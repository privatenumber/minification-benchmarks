import fs from 'node:fs/promises';
import OpenAI from 'openai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { Data } from '../../types.js';
import { getMessage } from './get-message.js';

const token = process.env.GH_TOKEN;

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: Data,
) => {
	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = await getMessage(minifiers, data);

	if (!token) {
		return '';
	}

	const client = new OpenAI({
		baseURL: 'https://models.inference.ai.azure.com',
		apiKey: process.env.GH_TOKEN,
	});
	const response = await client.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{
				role: 'system',
				content: todaysDate + systemPrompt,
			},
			{
				role: 'user',
				content: message,
			},
		],
	});

	let analysis = response.choices[0].message.content!;
	analysis = analysis.replaceAll('\n---\n', '');
	return analysis;
};
