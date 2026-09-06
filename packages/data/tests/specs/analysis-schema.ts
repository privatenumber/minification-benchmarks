import { expect, test } from 'manten';
import { getAnalysisSchema } from '../../update-readme/ai-analysis/schema.ts';

const artifactNames = ['react', 'moment', 'd3'];
const schema = getAnalysisSchema(artifactNames);

const analysis = {
	intro: 'intro',
	rounds: {
		react: 'react commentary',
		moment: 'moment commentary',
		d3: 'd3 commentary',
	},
	conclusion: 'conclusion',
};

test('accepts a complete analysis', () => {
	expect(schema.parse(analysis)).toStrictEqual(analysis);
});

test('requires commentary for every artifact', () => {
	const { rounds, ...rest } = analysis;
	expect(
		schema.safeParse({
			...rest,
			rounds: {
				react: 'r',
				moment: 'm',
			},
		}).success,
	).toBe(false);
});

test('rejects unknown artifacts', () => {
	expect(
		schema.safeParse({
			...analysis,
			rounds: {
				...analysis.rounds,
				React: 'typo',
			},
		}).success,
	).toBe(false);
});

test('rejects unknown top-level fields', () => {
	expect(
		schema.safeParse({
			...analysis,
			extra: 'not allowed',
		}).success,
	).toBe(false);
});

test('rejects blank commentary', () => {
	for (const field of ['intro', 'conclusion'] as const) {
		expect(schema.safeParse({
			...analysis,
			[field]: '   ',
		}).success).toBe(false);
	}

	expect(
		schema.safeParse({
			...analysis,
			rounds: {
				...analysis.rounds,
				react: '  ',
			},
		}).success,
	).toBe(false);
});
