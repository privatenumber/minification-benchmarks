import { outdent } from 'outdent';
import type {
	AnalyzedArtifact,
	AnalyzedData,
	AnalyzedDataEntry,
	MinifierWithScore,
} from '../analyzed-data.ts';
import { getToolContext } from './tool-context.ts';

type ConfigSummary = {
	completed: number;
	failed: number;
	'best overall balance': number;
	'smallest minified output': number;
	'smallest minzipped output': number;
	fastest: number;
};

const getConfigSummary = (entries: ReadonlyArray<AnalyzedDataEntry>) => {
	// Aggregate counts are supplied so the model never recounts rounds
	const summary = new Map<string, ConfigSummary>();
	const getSummary = (minifierName: string): ConfigSummary => {
		const existing = summary.get(minifierName);
		if (existing) {
			return existing;
		}

		const created: ConfigSummary = {
			completed: 0,
			failed: 0,
			'best overall balance': 0,
			'smallest minified output': 0,
			'smallest minzipped output': 0,
			fastest: 0,
		};
		summary.set(minifierName, created);
		return created;
	};

	for (const [, artifact] of entries) {
		artifact.minifiedWithScores.forEach((entry, index) => {
			const stats = getSummary(entry.minifierName);

			if ('error' in entry.minifier.result) {
				stats.failed += 1;
				return;
			}

			stats.completed += 1;
			if (artifact.bestMinified?.[0] === entry.minifierName) {
				stats['smallest minified output'] += 1;
			}
			if (artifact.bestMinzipped?.[0] === entry.minifierName) {
				stats['smallest minzipped output'] += 1;
			}
			if (artifact.bestSpeed?.[0] === entry.minifierName) {
				stats.fastest += 1;
			}
			if (index === 0) {
				stats['best overall balance'] += 1;
			}
		});
	}

	return summary;
};

const getSummaryLines = (summary: Map<string, ConfigSummary>) => [...summary.entries()]
	// Sort for a stable summary independent of first appearance
	.sort(([a], [b]) => (a < b ? -1 : (a > b ? 1 : 0)))
	.map(([minifierName, stats]) => `- ${minifierName}: ${
		Object.entries(stats).map(([label, count]) => `${label}=${count}`).join(', ')
	}`);

const getToolContextLines = (minifierNames: Iterable<string>) => [...minifierNames]
	// Sort for a stable listing independent of artifact order
	.sort((a, b) => (a < b ? -1 : (a > b ? 1 : 0)))
	.map((minifierName) => {
		const context = getToolContext(minifierName);
		if (!context) {
			throw new Error(`Missing tool context for configuration "${minifierName}"`);
		}
		return `- ${minifierName} — ${context.implementationLanguage}. ${context.behavior}`;
	});

const formatConfigurationRow = (
	entry: MinifierWithScore,
	index: number,
	artifact: AnalyzedArtifact,
) => {
	if ('error' in entry.minifier.result) {
		const { error } = entry.minifier.result;
		// JSON-stringify keeps the failure on one line
		return `- ${entry.minifierName}: FAILED (stage: ${JSON.stringify(error.stage ?? '(unknown)')}, error: ${JSON.stringify(error.message)})`;
	}

	const labels: string[] = [];
	if (artifact.bestMinified?.[0] === entry.minifierName) {
		labels.push('smallest minified output');
	}
	if (artifact.bestMinzipped?.[0] === entry.minifierName) {
		labels.push('smallest minzipped output');
	}
	if (artifact.bestSpeed?.[0] === entry.minifierName) {
		labels.push('fastest');
	}
	if (index === 0) {
		labels.push('best overall balance');
	}

	const { minifiedBytes, minzippedBytes, time } = entry.minifier.result.data;
	const gzipReduction = (
		(artifact.gzipSize - minzippedBytes) / artifact.gzipSize
	).toLocaleString(undefined, { style: 'percent' });

	// Runtime relative to this artifact's fastest configuration, with the
	// baseline named so "Nx" can never be attached to the wrong tool.
	// 2.0x means the configuration took twice as long as the fastest one.
	const fastest = artifact.bestSpeed;
	const runtimeRelativeToFastest = fastest === undefined
		? ''
		: (fastest[0] === entry.minifierName
			? ', runtimeRelativeToFastest=1.0x'
			: `, runtimeRelativeToFastest=${(time / fastest[1].result.data.time).toFixed(1)}x (vs ${fastest[0]} at ${fastest[1].result.data.time} ms)`);

	return `- ${entry.minifierName}: minifiedBytes=${minifiedBytes}, minzippedBytes=${minzippedBytes}, gzipReduction=${gzipReduction}, averageTimeMs=${time}${runtimeRelativeToFastest}${labels.length > 0 ? ` [${labels.join(', ')}]` : ''}`;
};

const getFailureList = (artifact: AnalyzedArtifact) => artifact.minifiedWithScores
	.filter(({ minifier }) => 'error' in minifier.result)
	.map(({ minifierName, minifier }) => {
		if (!('error' in minifier.result)) {
			return minifierName;
		}
		const { stage, message } = minifier.result.error;
		// A missing stage must not erase a recorded timeout message
		return `${minifierName} (stage: ${JSON.stringify(stage ?? '(unknown)')}, error: ${JSON.stringify(message)})`;
	});

const getArtifactFacts = (artifact: AnalyzedArtifact) => {
	const facts: string[] = [];

	const balance = artifact.minifiedWithScores[0];
	if (!('error' in balance.minifier.result)) {
		facts.push(`best overall balance=${balance.minifierName} (${balance.minifier.result.data.minzippedBytes} minzipped bytes, ${balance.minifier.result.data.time} ms)`);
	}
	if (artifact.bestMinified) {
		facts.push(`smallest minified output=${artifact.bestMinified[0]} (${artifact.bestMinified[1].result.data.minifiedBytes} bytes)`);
	}
	if (artifact.bestMinzipped) {
		facts.push(`smallest minzipped output=${artifact.bestMinzipped[0]} (${artifact.bestMinzipped[1].result.data.minzippedBytes} bytes)`);
	}
	if (artifact.bestSpeed) {
		facts.push(`fastest=${artifact.bestSpeed[0]} (${artifact.bestSpeed[1].result.data.time} ms)`);
	}

	const failures = getFailureList(artifact);
	if (failures.length > 0) {
		facts.push(`failures: ${failures.join(', ')}`);
	}

	return facts;
};

/**
 * An artifact whose commentary completed earlier in this invocation.
 */
export type CompletedRound = {
	artifactName: string;
	artifact: AnalyzedArtifact;
	commentary: string;
};

export type NextArtifact = {
	artifactName: string;
	originalBytes: number;
};

/**
 * Evidence for one artifact's commentary call: this artifact's full results,
 * measured summaries of and commentary from already-completed rounds, and
 * next-artifact metadata for a closing transition.
 */
export const getArtifactMessage = ({
	artifactName,
	artifact,
	completedRounds,
	nextArtifact,
}: {
	artifactName: string;
	artifact: AnalyzedArtifact;
	completedRounds: CompletedRound[];
	nextArtifact: NextArtifact | undefined;
}) => {
	const rows = artifact.minifiedWithScores
		.map((entry, index) => formatConfigurationRow(entry, index, artifact))
		.join('\n');
	const finishedCount = artifact.minifiedWithScores
		.filter(({ minifier }) => !('error' in minifier.result))
		.length;

	let historySection = '';
	if (completedRounds.length > 0) {
		const historyEntries: AnalyzedDataEntry[] = completedRounds.map(
			round => [round.artifactName, round.artifact],
		);
		const summary = getConfigSummary(historyEntries);
		const roundLines = completedRounds.map((round, index) => outdent`
			${index + 1}. ${round.artifactName}: ${getArtifactFacts(round.artifact).join('; ')}
			Previous commentary for ${round.artifactName} (narrative context, not evidence): "${round.commentary}"
		`).join('\n');

		historySection = outdent`

			# Previous rounds

			Artifacts already covered, in README order, with their measured summaries. These measurements are the only evidence for statements about earlier artifacts.

			${roundLines}

			# Cumulative totals through ${completedRounds.length} previous round${completedRounds.length === 1 ? '' : 's'}

			Per-configuration counts across previous rounds only. Use them for cumulative statements, and never combine them with this round's results.

			${getSummaryLines(summary).join('\n')}
		`;
	}

	const nextSection = nextArtifact === undefined
		? ''
		: outdent`

		# Next artifact

		The next round covers ${nextArtifact.artifactName} at ${nextArtifact.originalBytes} original bytes. A closing transition may reference only this name and size, and must not predict its results.
	`;

	return outdent`
	# Tool context

	What each competing configuration is and does.

	${getToolContextLines(artifact.minifiedWithScores.map(({ minifierName }) => minifierName)).join('\n')}

	# Results — ${artifactName}

	## ${artifactName} — ${artifact.size} original bytes, ${artifact.gzipSize} gzipped bytes (${finishedCount} of ${artifact.minifiedWithScores.length} configurations finished)

	${rows}${historySection}${nextSection}
	`;
};

/**
 * Evidence for the overview call (introduction and conclusion). Contains
 * computed per-artifact facts and totals instead of raw rows or generated
 * prose, so the verdict is grounded in measured facts only.
 */
export const getOverviewMessage = (data: AnalyzedData) => {
	const summary = getConfigSummary(data);

	const artifactFacts = data.map(([artifactName, artifact]) => `- ${artifactName}: ${getArtifactFacts(artifact).join('; ')}`);

	return outdent`
	# Tool context

	What each competing configuration is and does.

	${getToolContextLines(summary.keys()).join('\n')}

	# Benchmark overview

	${data.length} artifacts are evaluated, in this exact order by original size: ${data.map(([artifactName, artifact]) => `${artifactName} (${artifact.size} original bytes, ${artifact.gzipSize} gzipped bytes)`).join('; ')}. In total, ${summary.size} minifier configurations competed — variants like "terser (no compress)" count separately from their default configuration.

	# Per-artifact facts

	Award winners with their measurements, and failures with their recorded stage and message. Award names match the scoreboard summary below.

	${artifactFacts.join('\n')}

	# Scoreboard summary

	Per-configuration counts across all ${data.length} artifacts. Use these counts for any statement about totals.

	${getSummaryLines(summary).join('\n')}
	`;
};
