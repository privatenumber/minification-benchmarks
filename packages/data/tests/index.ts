import { describe } from 'manten';

describe('update-readme', async () => {
	await import('./specs/analysis-schema.ts');
	await import('./specs/analysis-generation.ts');
	await import('./specs/evidence.ts');
	await import('./specs/render-readme.ts');
});
