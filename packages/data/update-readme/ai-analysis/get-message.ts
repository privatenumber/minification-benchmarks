import { outdent } from 'outdent';
import { format } from 'date-fns';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import type { AnalyzedData } from '../analyzed-data.ts';
import { getToolContext } from './tool-context.ts';

type ConfigSummary = {
	completed: number;
	failed: number;
	'best overall balance': number;
	'smallest minified output': number;
	'smallest minzipped output': number;
	fastest: number;
};

export const getMessage = (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
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

	const summaryLines = [...summary.entries()]
		// Sort for a stable summary independent of first appearance
		.sort(([a], [b]) => (a < b ? -1 : (a > b ? 1 : 0)))
		.map(([minifierName, stats]) => `- ${minifierName}: ${
			Object.entries(stats).map(([label, count]) => `${label}=${count}`).join(', ')
		}`);

	const toolContextLines = [...summary.keys()]
		.map((minifierName) => {
			const context = getToolContext(minifierName);
			if (!context) {
				throw new Error(`Missing tool context for configuration "${minifierName}"`);
			}
			return `- ${minifierName} — ${context.implementationLanguage}. ${context.behavior}`;
		});

	return outdent`
	# Tool context

	What each competing configuration is and does. Use this to explain configuration differences, not performance: implementation language does not establish why a measured result occurred.

	${toolContextLines.join('\n')}

	# Minifiers
	${
		minifiers
			.map(minifier => `- ${minifier.name} v${minifier.meta.version}${minifier.meta.publishDate ? ` released ${format(minifier.meta.publishDate, 'yyyy-MM-dd')}` : ''}`)
			.join('\n')
	}

	# Results

	${data.length} artifacts are evaluated, in this exact order: ${data.map(([artifactName]) => artifactName).join(', ')}. In total, ${summary.size} minifier configurations competed — variants like "terser (no compress)" count separately from their default configuration.

	Each section lists every configuration in ranking order (best overall balance first), with exact minified bytes (raw output), exact minzipped bytes (after gzip), gzip reduction relative to the original artifact's gzipped size, elapsed milliseconds (averages of repeated runs), the ratio to the artifact's fastest configuration, and awards.

	${
		data.map(([artifactName, artifact]) => {
			const finishedCount = artifact.minifiedWithScores.filter(({ minifier }) => !('error' in minifier.result)).length;

			const rows = artifact.minifiedWithScores.map((entry, index) => {
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
				const fastestResult = artifact.bestSpeed?.[1].result;
				const speedVsFastest = fastestResult && 'data' in fastestResult
					? `speedVsFastest=${(time / fastestResult.data.time).toFixed(1)}x, `
					: '';

				return `- ${entry.minifierName}: minifiedBytes=${minifiedBytes}, minzippedBytes=${minzippedBytes}, gzipReduction=${gzipReduction}, averageTimeMs=${time}, ${speedVsFastest}${labels.length > 0 ? ` [${labels.join(', ')}]` : ''}`;
			}).join('\n');

			return outdent`
			## ${artifactName} — ${artifact.size} original bytes, ${artifact.gzipSize} gzipped bytes (${finishedCount} of ${artifact.minifiedWithScores.length} configurations finished)
			${rows}
			`;
		}).join('\n\n')
	}

	# Scoreboard summary

	Per-configuration counts across all ${data.length} artifacts. Award names match the labels used in the sections above. Use these counts for any statement about totals.

	${summaryLines.join('\n')}
	`;
};
