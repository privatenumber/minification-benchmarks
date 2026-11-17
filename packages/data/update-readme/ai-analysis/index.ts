import fs from 'node:fs/promises';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import { getChampion, type AnalyzedData } from '../analyzed-data.ts';
import { getMessage } from './get-message.ts';

const apiKey = process.env.OPENCODE_GO_API_KEY;
export const createAnalysisProvider = (session = 'minification-benchmarks-ai-analysis') => createOpenAICompatible({
	name: 'opencode-go',
	baseURL: 'https://opencode.ai/zen/go/v1',
	apiKey,
	// Go requires non-OpenCode clients to identify themselves and send a
	// stable session ID per conversation.
	// https://opencode.ai/docs/go/#where-can-i-use-it
	headers: {
		'User-Agent': 'minification-benchmarks/1.0',
		'x-opencode-session': session,
	},
});
const provider = createAnalysisProvider();

export const getAnalysisPrompt = async (minifiers: MinifierLoaded[], data: AnalyzedData) => {
	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = getMessage(minifiers, data);
	return {
		instructions: `${todaysDate}\n\n${systemPrompt}`,
		prompt: message,
	};
};

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
	const { instructions, prompt } = await getAnalysisPrompt(minifiers, data);

	if (!apiKey) {
		// In CI a missing key would publish new tables beside a stale analysis
		if (process.env.CI) {
			throw new Error('OPENCODE_GO_API_KEY is required in CI');
		}
		console.warn('Skipping AI analysis due to missing OPENCODE_GO_API_KEY');
		return;
	}

	const { text } = await generateText({
		model: provider.chatModel('glm-5.3'),
		temperature: 0,
		instructions,
		prompt,
	});
	const { champion } = getChampion(data);
	const headline = champion
		? `**Champion: ${champion.name}**, with ${champion.wins} of ${data.length} round wins by the ranking above.\n\n`
		: '';

	return {
		systemPrompt: `${instructions}\n\n${prompt}`,
		analysis: headline + text.replaceAll('\n---\n', ''),
	};
};
