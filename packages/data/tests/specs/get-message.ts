import { expect, test } from 'manten';
import { createMinifier } from '@minification-benchmarks/minifiers/utils/create-minifier.ts';
import { data as benchmarkData } from '../../data/index.ts';
import { analyzedData } from '../fixtures.ts';
import { getMessage } from '../../update-readme/ai-analysis/get-message.ts';
import { getToolContext } from '../../update-readme/ai-analysis/tool-context.ts';

const loadedMinifier = Object.assign(createMinifier('@swc/core', {}), {
	meta: {
		name: '@swc/core',
		version: '1.0.0',
		url: 'https://example.com/swc',
		registry: 'npm' as const,
	},
});

test('every benchmarked configuration has verified tool context', () => {
	const missing = Object
		.values(benchmarkData)
		.flatMap(artifact => Object.keys(artifact.minified))
		.filter(minifierName => !getToolContext(minifierName));

	expect(missing).toStrictEqual([]);
});

test('evidence reports context, both size metrics, failure details, and aggregate counts', () => {
	const message = getMessage([loadedMinifier], analyzedData);

	// Context is included for each configuration, keyed by exact name
	expect(message).toContain('- @swc/core — Rust.');
	expect(message).toContain('- terser (no compress) — JavaScript.');

	// Both size metrics are supplied and labeled so awards can't be confused.
	// Ratios are precomputed against the artifact's fastest configuration.
	expect(message).toContain('minifiedBytes=20, minzippedBytes=10, gzipReduction=75%, averageTimeMs=30, speedVsFastest=1.0x');
	expect(message).toContain('minifiedBytes=38, minzippedBytes=15, gzipReduction=81%, averageTimeMs=50, speedVsFastest=1.0x');

	// Totals are supplied so counts are never derived
	expect(message).toContain('In total, 3 minifier configurations competed');
	expect(message).toContain('(2 of 2 configurations finished)');
	expect(message).toContain('(1 of 2 configurations finished)');

	// Failures keep their exact stage and message
	expect(message).toContain('FAILED (stage: "minification", error: "terser exploded")');

	// Variants are separate configurations with their own counts
	expect(message).toContain('terser (no compress): completed=1, failed=0, best overall balance=0, smallest minified output=1, smallest minzipped output=0, fastest=1');

	// Aggregate counts are supplied, not left for the model to derive
	expect(message).toContain('@swc/core: completed=2, failed=0, best overall balance=2, smallest minified output=1, smallest minzipped output=2, fastest=1');
	expect(message).toContain('terser: completed=0, failed=1');
});
