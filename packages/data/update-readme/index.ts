import fs from 'fs/promises';
import { getMinifiers } from '@minification-benchmarks/minifiers';
import { getAiAnalysis } from './ai-analysis/index.ts';
import { getAnalyzedData } from './analyzed-data.ts';
import { renderReadme } from './render-readme.ts';

const minifiers = await getMinifiers();

const analyzedData = getAnalyzedData();
const analysis = await getAiAnalysis(
	minifiers,
	analyzedData,
);

const readmePath = './README.md';
const readme = await fs.readFile(readmePath, 'utf8');

// Match the previous UTC-day display behavior
const utcToday = new Date(new Date().toISOString().split('T')[0]);

const newReadme = renderReadme({
	readme,
	minifiers,
	analyzedData,
	analysis,
	date: utcToday,
});

await fs.writeFile(readmePath, newReadme);
