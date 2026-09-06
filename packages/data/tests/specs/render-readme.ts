import { expect, test } from 'manten';
import { createMinifier } from '@minification-benchmarks/minifiers/utils/create-minifier.ts';
import { analyzedData } from '../fixtures.ts';
import { renderReadme } from '../../update-readme/render-readme.ts';

// Supplied oldest-first so rendering must reorder by release date
const loadedMinifiers = [
	Object.assign(createMinifier('older-minifier', {}), {
		meta: {
			name: 'older-minifier',
			version: '1.0.0',
			url: 'https://example.com/older',
			registry: 'npm' as const,
			publishDate: new Date('2020-01-01'),
		},
	}),
	Object.assign(createMinifier('newer-minifier', {}), {
		meta: {
			name: 'newer-minifier',
			version: '2.0.0',
			url: 'https://example.com/newer',
			registry: 'npm' as const,
			publishDate: new Date('2024-01-01'),
		},
	}),
];

// Template with stale content in every dynamic region
const readmeTemplate = [
	'# Benchmarks',
	'Intro prose.',
	'<!-- minifiers:start -->STALE MINIFIERS<!-- minifiers:end -->',
	'_Benchmarks last updated on <!-- lastUpdated:start -->STALE DATE<!-- lastUpdated:end -->._',
	'<!-- aiIntro:start -->STALE INTRO<!-- aiIntro:end -->',
	'## 📋 Results',
	'<!-- aiResultsTip:start -->STALE TIP<!-- aiResultsTip:end -->',
	'<!-- benchmarks:start -->STALE BENCHMARKS<!-- benchmarks:end -->',
	'<!-- aiVerdict:start -->STALE VERDICT<!-- aiVerdict:end -->',
	'Tail prose.',
].join('\n\n');

const date = new Date('2026-09-06T00:00:00Z');

// Keys intentionally out of artifact order: association must not depend on it
const analysis = {
	intro: 'fresh intro',
	rounds: {
		d3: 'd3 commentary',
		react: 'react commentary',
	},
	conclusion: 'fresh conclusion',
};

test('associates commentary with its artifact and clears stale content', () => {
	const output = renderReadme({
		readme: readmeTemplate,
		minifiers: loadedMinifiers,
		analyzedData,
		analysis,
		date,
	});

	expect(output).not.toContain('STALE');
	expect(output).toContain('fresh intro');
	expect(output).toContain('fresh conclusion');
	expect(output).toContain('Sep 6, 2026');
	expect(output).toContain('[🏁 Skip to the conclusion](#-verdict)');
	expect(output).toContain('## 🏁 Verdict');

	// Each table renders before its own commentary, never the other's
	const [reactSection, d3Section] = output.split('\n\n----\n\n');

	const reactTableEnd = reactSection.indexOf('</div>');
	expect(reactTableEnd).toBeGreaterThan(-1);
	expect(reactSection).toContain('react v17.0.2');
	expect(reactSection.indexOf('react commentary')).toBeGreaterThan(reactTableEnd);
	expect(reactSection.indexOf('d3 commentary')).toBe(-1);

	const d3TableEnd = d3Section.indexOf('</div>');
	expect(d3TableEnd).toBeGreaterThan(-1);
	expect(d3Section.indexOf('d3 commentary')).toBeGreaterThan(d3TableEnd);
	expect(d3Section.indexOf('react commentary')).toBe(-1);
});

test('clears previous commentary when analysis is unavailable', () => {
	const withAnalysis = renderReadme({
		readme: readmeTemplate,
		minifiers: loadedMinifiers,
		analyzedData,
		analysis,
		date,
	});
	const withoutAnalysis = renderReadme({
		readme: withAnalysis,
		minifiers: loadedMinifiers,
		analyzedData,
		analysis: undefined,
		date,
	});

	expect(withoutAnalysis).not.toContain('fresh intro');
	expect(withoutAnalysis).not.toContain('react commentary');
	expect(withoutAnalysis).not.toContain('d3 commentary');
	expect(withoutAnalysis).not.toContain('fresh conclusion');
	expect(withoutAnalysis).not.toContain('🤖');
	expect(withoutAnalysis).not.toContain('## 🏁 Verdict');
	expect(withoutAnalysis).not.toContain('Skip to the conclusion');

	// Static content and benchmark tables survive
	expect(withoutAnalysis).toContain('Intro prose.');
	expect(withoutAnalysis).toContain('## 📋 Results');
	expect(withoutAnalysis).toContain('react v17.0.2');
	expect(withoutAnalysis).toContain('Tail prose.');
});

test('sorts the minifier table without mutating its inputs', () => {
	const output = renderReadme({
		readme: readmeTemplate,
		minifiers: loadedMinifiers,
		analyzedData,
		analysis: undefined,
		date,
	});

	// Newest release first in the rendered table
	expect(output.indexOf('2.0.0')).toBeLessThan(output.indexOf('1.0.0'));

	// Input array keeps its original order
	expect(loadedMinifiers.map(({ meta }) => meta.name)).toStrictEqual([
		'older-minifier',
		'newer-minifier',
	]);
});
