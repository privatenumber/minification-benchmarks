import { commentMark } from 'comment-mark';
import { format } from 'date-fns';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import md from 'md-pen';
import type { AiAnalysis } from './ai-analysis/schema.ts';
import type { AnalyzedData } from './analyzed-data.ts';
import { generateBenchmarks } from './render-benchmarks.ts';

const PROMPTS_PATH = 'packages/data/update-readme/ai-analysis';
const PROMPTS_LINK = `[artifact prompt](${PROMPTS_PATH}/artifact-prompt.txt) and [overview prompt](${PROMPTS_PATH}/overview-prompt.txt)`;

type RenderReadmeOptions = {
	readme: string;
	minifiers: MinifierLoaded[];
	analyzedData: AnalyzedData;
	analysis: AiAnalysis | undefined;

	/** Date shown as "last updated". */
	date: Date;
};

export const renderReadme = ({
	readme,
	minifiers,
	analyzedData,
	analysis,
	date,
}: RenderReadmeOptions) => {
	const minifiersList = md.table([
		['Minifier', 'Version', 'Release date ↓'],
		...[...minifiers].sort(
			(a, b) => {
				const dateA = a.meta.publishDate ? a.meta.publishDate.getTime() : 0;
				const dateB = b.meta.publishDate ? b.meta.publishDate.getTime() : 0;
				return dateB - dateA;
			},
		)
			.map(
				({ meta }) => [
					md.link(meta.url, meta.name),
					meta.registry === 'npm'
						? md.link(`https://www.npmjs.com/package/${meta.name}/v/${meta.version}`, meta.version)
						: meta.version,
					meta.publishDate
						? format(meta.publishDate, 'yyyy-MM-dd')
						: '',
				],
			),
	]);

	// Analysis-adjacent page furniture is rendered only when commentary exists,
	// so runs without an API key don't advertise analysis that isn't there.
	const aiIntro = analysis && `🤖 _AI commentary is woven throughout this README — generated from the benchmark data via the ${PROMPTS_LINK}._

${analysis.intro}`;
	const aiResultsTip = analysis && '> [!TIP]\n> What\'s the verdict? [🏁 Skip to the conclusion](#-verdict)';
	const aiVerdict = analysis && `## 🏁 Verdict

> [!NOTE]
> 🤖 This verdict is AI generated — see the ${PROMPTS_LINK}.

${analysis.conclusion}`;

	return commentMark(readme, {
		lastUpdated: format(date, 'MMM d, y'),
		minifiers: minifiersList,
		benchmarks: generateBenchmarks(analyzedData, analysis?.rounds),
		// Empty strings clear stale regions when AI analysis is unavailable
		aiIntro: aiIntro ?? '',
		aiResultsTip: aiResultsTip ?? '',
		aiVerdict: aiVerdict ?? '',
	}) as string;
};
