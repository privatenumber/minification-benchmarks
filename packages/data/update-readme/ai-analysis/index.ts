import fs from 'node:fs/promises';
import {
	createGateway, generateText, Output, type LanguageModel,
} from 'ai';
import type { AnalyzedArtifact, AnalyzedData } from '../analyzed-data.ts';
import { getArtifactMessage, getOverviewMessage } from './evidence.ts';
import { commentarySchema, overviewSchema } from './schema.ts';
import { runWithConcurrency } from './run-with-concurrency.ts';

const MODEL = 'zai/glm-5.3-flash';

// Free-tier Gateway rate limits reject bursts: keep calls near-sequential
const MAX_CONCURRENT_CALLS = 2;

const gateway = createGateway({ apiKey: process.env.VERCEL_AI_GATEWAY_API_KEY });

type GetAiAnalysisOptions = {

	/** API key for the Gateway. Defaults to the environment variable. */
	apiKey?: string;

	/** Language model override, for testing. */
	model?: LanguageModel;
};

export const getAiAnalysis = async (
	data: AnalyzedData,
	{
		apiKey = process.env.VERCEL_AI_GATEWAY_API_KEY,
		model = gateway(MODEL),
	}: GetAiAnalysisOptions = {},
) => {
	if (!apiKey) {
		console.warn('Skipping AI analysis due to missing VERCEL_AI_GATEWAY_API_KEY');
		return;
	}

	const [artifactPrompt, overviewPrompt] = await Promise.all([
		fs.readFile(new URL('artifact-prompt.txt', import.meta.url), 'utf8'),
		fs.readFile(new URL('overview-prompt.txt', import.meta.url), 'utf8'),
	]);
	const todaysInstructions = `Today's date is ${new Date().toISOString().split('T')[0]}\n\n`;

	// One failed request aborts in-flight ones and rejects the whole analysis
	const controller = new AbortController();
	const withErrorContext = async <T>(
		task: () => Promise<T>,
		taskName: string,
	): Promise<T> => {
		try {
			return await task();
		} catch (error) {
			controller.abort();
			throw new Error(`AI analysis failed for ${taskName}`, { cause: error });
		}
	};

	const generateCommentary = async (artifactName: string, artifact: AnalyzedArtifact) => {
		const { output } = await generateText({
			model,
			output: Output.object({ schema: commentarySchema }),
			instructions: todaysInstructions + artifactPrompt,
			prompt: getArtifactMessage(artifactName, artifact),
			abortSignal: controller.signal,
		});

		return output.commentary;
	};

	const generateOverview = async () => {
		const { output } = await generateText({
			model,
			output: Output.object({ schema: overviewSchema }),
			instructions: todaysInstructions + overviewPrompt,
			prompt: getOverviewMessage(data),
			abortSignal: controller.signal,
		});

		return output;
	};

	const commentaryTasks = data.map(([artifactName, artifact]) => async () => withErrorContext(
		() => generateCommentary(artifactName, artifact),
		`artifact "${artifactName}"`,
	));
	const overviewTask = async () => withErrorContext(generateOverview, 'the overview');

	// Commentary calls are independent of each other and of the overview, so
	// they run concurrently within the rate-limit budget. The overview keeps
	// one slot of that shared budget.
	const [rounds, overview] = await Promise.all([
		runWithConcurrency(commentaryTasks, MAX_CONCURRENT_CALLS - 1, controller.signal),
		overviewTask(),
	]);

	return {
		intro: overview.intro,
		rounds: Object.fromEntries(data.map(([artifactName], index) => [artifactName, rounds[index]])),
		conclusion: overview.conclusion,
	};
};
