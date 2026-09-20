import fs from 'node:fs/promises';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { AnalyzedData } from '../analyzed-data.ts';
import { getMessage } from './get-message.ts';

const apiKey = process.env.OPENCODE_GO_API_KEY;
const provider = createOpenAICompatible({
	name: 'opencode-go',
	baseURL: 'https://opencode.ai/zen/go/v1',
	apiKey,
	// Go requires non-OpenCode clients to identify themselves and send a
	// stable session ID per conversation.
	// https://opencode.ai/docs/go/#where-can-i-use-it
	headers: {
		'User-Agent': 'minification-benchmarks/1.0',
		'x-opencode-session': 'minification-benchmarks-ai-analysis',
	},
});

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = await getMessage(minifiers, data);

	if (!apiKey) {
		console.warn('Skipping AI analysis due to missing OPENCODE_GO_API_KEY');
		return;
	}

	const systemPromptWithDate = `${todaysDate}\n\n${systemPrompt}`;

	const { text } = await generateText({
		model: provider.chatModel('glm-5.3-flash'),
		instructions: systemPromptWithDate,
		prompt: message,
	});

	return {
		systemPrompt: `${systemPromptWithDate}\n\n${message}`,
		analysis: text.replaceAll('\n---\n', ''),
	};
};
