import { describe } from 'manten';

describe('update-readme', async () => {
	await import('./specs/analysis-schema.ts');
	await import('./specs/get-message.ts');
	await import('./specs/render-readme.ts');
});
