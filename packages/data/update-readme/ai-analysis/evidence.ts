import { outdent } from 'outdent';
import type {
	AnalyzedArtifact,
	AnalyzedData,
	MinifierWithScore,
} from '../analyzed-data.ts';
import { getToolContext } from './tool-context.ts';

const getConfigSummary = (data: AnalyzedData) => {
	type ConfigSummary = {
		completed: number;
		failed: number;
		'best overall balance': number;
		'smallest minified output': number;
		'smallest minzipped output': number;
		fastest: number;
	};

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

	for (const [, artifact] of data) {
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

	// Name the ratio's baseline so "Nx" can never be attached to the wrong tool
	const fastestName = artifact.bestSpeed?.[0];
	const speedVsFastest = fastestName === undefined
		? ''
		: (fastestName === entry.minifierName
			? ', speedVsFastest=1.0x'
			: `, speedVsFastest=${(time / artifact.bestSpeed![1].result.data.time).toFixed(1)}x (vs ${fastestName} at ${artifact.bestSpeed![1].result.data.time} ms)`);

	return `- ${entry.minifierName}: minifiedBytes=${minifiedBytes}, minzippedBytes=${minzippedBytes}, gzipReduction=${gzipReduction}, averageTimeMs=${time}${speedVsFastest}${labels.length > 0 ? ` [${labels.join(', ')}]` : ''}`;
};

const getFailureList = (artifact: AnalyzedArtifact) => artifact.minifiedWithScores
	.filter(({ minifier }) => 'error' in minifier.result)
	.map(({ minifierName, minifier }) => {
		if (!('error' in minifier.result)) {
			return minifierName;
		}
		return `${minifierName} (${minifier.result.error.stage ?? 'unrecorded stage'})`;
	});

/**
 * Evidence for one artifact's commentary call. Contains only this artifact's
 * results, so the model cannot make cross-artifact claims.
 */
export const getArtifactMessage = (
	artifactName: string,
	artifact: AnalyzedArtifact,
) => {
	const rows = artifact.minifiedWithScores
		.map((entry, index) => formatConfigurationRow(entry, index, artifact))
		.join('\n');
	const finishedCount = artifact.minifiedWithScores
		.filter(({ minifier }) => !('error' in minifier.result))
		.length;

	return outdent`
	# Tool context

	What each competing configuration is and does.

	${getToolContextLines(artifact.minifiedWithScores.map(({ minifierName }) => minifierName)).join('\n')}

	# Results — ${artifactName}

	## ${artifactName} — ${artifact.size} original bytes, ${artifact.gzipSize} gzipped bytes (${finishedCount} of ${artifact.minifiedWithScores.length} configurations finished)

	${rows}
	`;
};

/**
 * Evidence for the overview call (introduction and conclusion). Contains
 * computed per-artifact facts and totals instead of raw rows, so the verdict
 * is grounded in measured facts without requiring per-artifact prose.
 */
export const getOverviewMessage = (data: AnalyzedData) => {
	const summary = getConfigSummary(data);

	const summaryLines = [...summary.entries()]
		// Sort for a stable summary independent of first appearance
		.sort(([a], [b]) => (a < b ? -1 : (a > b ? 1 : 0)))
		.map(([minifierName, stats]) => `- ${minifierName}: ${
			Object.entries(stats).map(([label, count]) => `${label}=${count}`).join(', ')
		}`);

	const artifactFacts = data.map(([artifactName, artifact]) => {
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

		return `- ${artifactName}: ${facts.join('; ')}`;
	});

	return outdent`
	# Tool context

	What each competing configuration is and does.

	${getToolContextLines(summary.keys()).join('\n')}

	# Benchmark overview

	${data.length} artifacts are evaluated, in this exact order by original size: ${data.map(([artifactName, artifact]) => `${artifactName} (${artifact.size} original bytes, ${artifact.gzipSize} gzipped bytes)`).join('; ')}. In total, ${summary.size} minifier configurations competed — variants like "terser (no compress)" count separately from their default configuration.

	# Per-artifact facts

	Award winners with their measurements, and failures with their recorded stage. Award names match the scoreboard summary below.

	${artifactFacts.join('\n')}

	# Scoreboard summary

	Per-configuration counts across all ${data.length} artifacts. Use these counts for any statement about totals.

	${summaryLines.join('\n')}
	`;
};
