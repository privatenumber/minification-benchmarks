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

export const findChampionInAnalysis = (text: string, names: string[]) => {
	const heading = /^#{1,6}[ \t]+Best minifier(?:[ \t]*:(.*)|[ \t]*)$/im.exec(text);
	if (!heading) { return undefined; }
	const body = text.slice(heading.index + heading[0].length).split(/^#{1,6}[ \t]+/m)[0];
	const find = (content: string) => {
		const matches = names.flatMap((name) => {
			const escaped = name.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
			const match = new RegExp(String.raw`(?<![\w@/.-])${escaped}(?![\w/-]|\.[\w/-])`, 'i').exec(content);
			return match
				? [{
					name,
					index: match.index,
				}]
				: [];
		});
		return matches.sort((a, b) => a.index - b.index || b.name.length - a.name.length)[0]?.name;
	};
	const inHeading = find(heading[1] ?? '');
	if (inHeading) { return inHeading; }
	for (const sentence of body.split(/(?<=[.!?])\s+|\n+/)) {
		const decisive = /\b(?:crown goes to|crowning)\b/i.exec(sentence);
		if (decisive) {
			const winner = find(sentence.slice(decisive.index + decisive[0].length));
			if (winner) { return winner; }
		}
	}
	for (const paragraph of body.trim().split(/\n\s*\n/)) {
		for (const sentence of paragraph.split(/(?<=[.!?])\s+|\n+/)) {
			if (/\b(?:crown(?:ing|ed)?|champion|winner|goes to|takes)\b/i.test(sentence)) {
				const winner = find(sentence);
				if (winner) { return winner; }
			}
		}
		const first = find(paragraph);
		if (first) { return first; }
	}
	return undefined;
};

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
	const champion = getChampion(data).champion?.name;
	const names = [...new Set(data.flatMap(([, artifact]) => Object.keys(artifact.minified)))];
	const named = findChampionInAnalysis(text, names);
	if (!champion || named !== champion) {
		const message = `AI analysis champion ${named ?? '(not found)'} does not match ${champion ?? '(none)'}`;
		if (process.env.CI) {
			throw new Error(message);
		}
		console.warn(message);
		return;
	}

	return {
		systemPrompt: `${instructions}\n\n${prompt}`,
		analysis: text.replaceAll('\n---\n', ''),
	};
};
