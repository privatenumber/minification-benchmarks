import fs from 'node:fs/promises';
import crypto from 'node:crypto';
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

const model = provider.chatModel('glm-5.3');

export const getAiAnalysis = async (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
	existingHash?: string,
) => {
	const systemPromptPath = new URL('system-prompt.txt', import.meta.url);
	const systemPrompt = await fs.readFile(systemPromptPath.pathname, 'utf8');
	const message = await getMessage(minifiers, data);

	// Identifies the inputs an analysis was generated from, so an unchanged
	// analysis is reused instead of requested again. The prompt embeds the
	// current date, which is excluded to keep the analysis valid across days.
	const hash = crypto
		.createHash('sha256')
		.update(JSON.stringify([
			model.provider,
			model.modelId,
			systemPrompt,
			message,
		]))
		.digest('hex');

	if (existingHash === hash) {
		return;
	}

	if (!apiKey) {
		console.warn('Skipping AI analysis due to missing OPENCODE_GO_API_KEY');
		return;
	}

	const todaysDate = `Today's date is ${new Date().toISOString().split('T')[0]}`;
	const systemPromptWithDate = `${todaysDate}\n\n${systemPrompt}`;

	const { text } = await generateText({
		model,
		instructions: systemPromptWithDate,
		prompt: message,
	});

	return {
		systemPrompt: `${systemPromptWithDate}\n\n${message}`,
		// Only a successful generation returns the hash, so a skipped or failed
		// run never marks the previous analysis as current
		hash,
		analysis: text.replaceAll('\n---\n', ''),
	};
};
