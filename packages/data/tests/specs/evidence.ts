import { expect, test } from 'manten';
import { data as benchmarkData } from '../../data/index.ts';
import { analyzedData } from '../fixtures.ts';
import { getArtifactMessage, getOverviewMessage } from '../../update-readme/ai-analysis/evidence.ts';
import { getToolContext } from '../../update-readme/ai-analysis/tool-context.ts';

test('every benchmarked configuration has verified tool context', () => {
	const missing = Object
		.values(benchmarkData)
		.flatMap(artifact => Object.keys(artifact.minified))
		.filter(minifierName => !getToolContext(minifierName));

	expect(missing).toStrictEqual([]);
});

test('artifact evidence contains only its own artifact', () => {
	const [reactName, react] = analyzedData[0];
	const message = getArtifactMessage(reactName, react);

	// Own artifact: rows carry both size metrics and the named ratio baseline
	expect(message).toContain('# Results — react');
	expect(message).toContain('minifiedBytes=20, minzippedBytes=10, gzipReduction=75%, averageTimeMs=30, speedVsFastest=1.0x');
	expect(message).toContain('FAILED (stage: "minification", error: "terser exploded")');
	expect(message).toContain('(1 of 2 configurations finished)');

	// Isolation: no other artifact may appear, not even its name
	expect(message).not.toContain('d3');

	// Tool context is scoped to this artifact's configurations
	expect(message).toContain('- @swc/core — Rust.');
	expect(message).not.toContain('@tdewolff/minify');
});

test('artifact evidence names the speed ratio baseline', () => {
	const [d3Name, d3] = analyzedData[1];
	const message = getArtifactMessage(d3Name, d3);

	// swc runs 60 ms against the artifact's 50 ms fastest run
	expect(message).toContain('speedVsFastest=1.2x (vs terser (no compress) at 50 ms)');
	expect(message).toContain('speedVsFastest=1.0x');
});

test('overview evidence contains computed facts and totals', () => {
	const message = getOverviewMessage(analyzedData);

	// Artifact order with sizes
	expect(message).toContain('react (100 original bytes, 40 gzipped bytes)');
	expect(message).toContain('d3 (200 original bytes, 80 gzipped bytes)');
	expect(message).toContain('In total, 3 minifier configurations competed');

	// Per-artifact facts with measurements and failure stages
	expect(message).toContain('best overall balance=@swc/core (10 minzipped bytes, 30 ms)');
	expect(message).toContain('smallest minified output=terser (no compress) (38 bytes)');
	expect(message).toContain('failures: terser (minification)');

	// Scoreboard totals
	expect(message).toContain('@swc/core: completed=2, failed=0, best overall balance=2, smallest minified output=1, smallest minzipped output=2, fastest=1');
	expect(message).toContain('terser: completed=0, failed=1');
});
