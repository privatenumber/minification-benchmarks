import fs from 'node:fs/promises';
import OpenAI from 'openai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { Data } from '../../types.js';
import { getMessage } from './get-message.js';

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: Data,
) => {
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');

	const client = new OpenAI({
		baseURL: 'https://models.inference.ai.azure.com',
		apiKey: process.env.GH_TOKEN,
	});

	const message = await getMessage(minifiers, data);
	const response = await client.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{
				role: 'system',
				content: systemPrompt,
			},
			{
				role: 'user',
				content: message,
			},
		],
	});

	return response.choices[0].message.content!;
};
