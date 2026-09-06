import { expect, test } from 'manten';
import { commentarySchema, overviewSchema } from '../../update-readme/ai-analysis/schema.ts';

test('commentary schema rejects blank text and unknown fields', () => {
	expect(commentarySchema.parse({ commentary: 'ok' })).toStrictEqual({ commentary: 'ok' });
	expect(commentarySchema.safeParse({ commentary: '   ' }).success).toBe(false);
	expect(commentarySchema.safeParse({
		commentary: 'ok',
		extra: 1,
	}).success).toBe(false);
});

test('overview schema rejects blank text and unknown fields', () => {
	const overview = {
		intro: 'i',
		conclusion: 'c',
	};
	expect(overviewSchema.parse(overview)).toStrictEqual(overview);
	expect(overviewSchema.safeParse({
		...overview,
		intro: ' ',
	}).success).toBe(false);
	expect(overviewSchema.safeParse({
		...overview,
		rounds: {},
	}).success).toBe(false);
});
