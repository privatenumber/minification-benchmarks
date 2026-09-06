import fs from 'node:fs/promises';
import {
	createGateway,
	generateText,
	Output,
	type LanguageModel,
} from 'ai';
import type { AnalyzedArtifact, AnalyzedData } from '../analyzed-data.ts';
import {
	getArtifactMessage,
	getOverviewMessage,
	type CompletedRound,
	type NextArtifact,
} from './evidence.ts';
import { commentarySchema, overviewSchema } from './schema.ts';

const MODEL = 'zai/glm-5.3-flash';

type GetAiAnalysisOptions = {
	// Gateway API key. Defaults to the environment variable.
	apiKey?: string;

	// Language model override, for testing.
	model?: LanguageModel;
};

export const getAiAnalysis = async (
	data: AnalyzedData,
	{
		apiKey,
		model,
	}: GetAiAnalysisOptions = {},
) => {
	// Resolve credentials at invocation time; an empty string counts as missing
	const resolvedApiKey = apiKey ?? process.env.VERCEL_AI_GATEWAY_API_KEY;
	if (!resolvedApiKey) {
		console.warn('Skipping AI analysis due to missing VERCEL_AI_GATEWAY_API_KEY');
		return;
	}

	const languageModel = model ?? createGateway({ apiKey: resolvedApiKey })(MODEL);

	const [artifactPrompt, overviewPrompt] = await Promise.all([
		fs.readFile(new URL('artifact-prompt.txt', import.meta.url), 'utf8'),
		fs.readFile(new URL('overview-prompt.txt', import.meta.url), 'utf8'),
	]);
	const todaysInstructions = `Today's date is ${new Date().toISOString().split('T')[0]}\n\n`;

	// One failed request aborts in-flight ones and rejects the whole analysis
	const controller = new AbortController();

	const generateCommentary = async (
		artifactName: string,
		artifact: AnalyzedArtifact,
		completedRounds: CompletedRound[],
		nextArtifact: NextArtifact | undefined,
	) => {
		const { output } = await generateText({
			model: languageModel,
			output: Output.object({ schema: commentarySchema }),
			instructions: todaysInstructions + artifactPrompt,
			prompt: getArtifactMessage({
				artifactName,
				artifact,
				completedRounds,
				nextArtifact,
			}),
			abortSignal: controller.signal,
		});

		return output.commentary;
	};

	const generateOverview = async () => {
		const { output } = await generateText({
			model: languageModel,
			output: Output.object({ schema: overviewSchema }),
			instructions: todaysInstructions + overviewPrompt,
			prompt: getOverviewMessage(data),
			abortSignal: controller.signal,
		});

		return output;
	};

	const overviewPromise = (async () => {
		try {
			return await generateOverview();
		} catch (error) {
			// A failure here after an artifact failure is secondary cancellation;
			// the artifact error is already wrapped and surfaced by the loop
			if (controller.signal.aborted) {
				throw error;
			}
			controller.abort();
			throw new Error('AI analysis failed for the overview', { cause: error });
		}
	})();

	// Handled separately so an artifact failure cannot surface as an unhandled
	// rejection; the wrapped error is still awaited on success paths
	overviewPromise.catch(() => {});

	const rounds: Record<string, string> = {};
	const completedRounds: CompletedRound[] = [];

	// Rounds are sequential by design: each request carries the completed
	// history of the rounds before it
	for (const [index, [artifactName, artifact]] of data.entries()) {
		if (controller.signal.aborted) {
			break;
		}

		const nextEntry = data[index + 1];
		const nextArtifact: NextArtifact | undefined = nextEntry && {
			artifactName: nextEntry[0],
			originalBytes: nextEntry[1].size,
		};

		let commentary: string;
		try {
			commentary = await generateCommentary(
				artifactName,
				artifact,
				completedRounds,
				nextArtifact,
			);
		} catch (error) {
			if (controller.signal.aborted) {
				// This round was cancelled by an earlier failure; that failure is
				// wrapped and awaited below
				break;
			}
			controller.abort();
			throw new Error(`AI analysis failed for artifact "${artifactName}"`, { cause: error });
		}

		rounds[artifactName] = commentary;
		completedRounds.push({
			artifactName,
			artifact,
			commentary,
		});
	}

	const overview = await overviewPromise;

	return {
		intro: overview.intro,
		rounds,
		conclusion: overview.conclusion,
	};
};
