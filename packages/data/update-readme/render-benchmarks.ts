import path from 'path';
import { outdent } from 'outdent';
import { capitalize } from 'lodash-es';
import type { BenchmarkResultSuccessWithRuns } from '@minification-benchmarks/bench/types.ts';
import { minifiersDirectory } from '@minification-benchmarks/minifiers/utils/minifiers-directory.ts';
import md from 'md-pen';
import { byteSize } from '../utils/byte-size.ts';
import { percent, formatMs } from './formatting.ts';
import type { AnalyzedData, AnalyzedArtifact } from './analyzed-data.ts';
import { getBarChartUrl } from './bar-chart.ts';

const displayColumn = (
	text: string,
	annotation: string,
	isWinner: boolean,
) => {
	const columnText = (
		md.sup(`${isWinner ? '🏆' : ''}${annotation || ''} `)
		+ md.code(text)
	);

	return isWinner ? md.bold(columnText) : columnText;
};

const compareSpeed = (
	current: BenchmarkResultSuccessWithRuns,
	fastest?: BenchmarkResultSuccessWithRuns,
) => (
	(fastest === current)
		? ''
		: md.italic(
			`${Math.floor(current.data.time / fastest!.data.time)}x`,
		)
);

const generateBenchmarkTable = (
	artifactName: string,
	artifact: AnalyzedArtifact,
) => md.table(
	[
		['Artifact', 'Original size', 'Gzip size'],
		[
			`${md.link(
				`https://www.npmjs.com/package/${artifactName}/v/${artifact.version}`,
				`${artifactName} v${artifact.version}`,
			)} (${md.link(`https://unpkg.com/${artifactName}@${artifact.version}${artifact.filePath}`, 'Source')})`,
			md.code(byteSize(artifact.size).toString()),
			md.code(byteSize(artifact.gzipSize).toString()),
			'',
		],

		['Minifier', 'Minified size', 'Minzipped size', 'Time'].map(md.bold),
		...artifact.minifiedWithScores.map(({ minifierName, minifier }, index) => {
			const { result } = minifier;

			const columns = [
				`${(index + 1).toString()}. ${md.link(
					path.relative(process.cwd(), path.join(minifiersDirectory, minifier.minifierPath)),
					minifierName,
				)}`,
			];

			if ('error' in result) {
				const message = result.error.stage || result.error.message;
				columns[0] += ` ${
					md.sub(
						`❌ ${
							message === 'timeout'
								? 'Timed out'
								: capitalize(message.split('\n')[0].slice(0, 15))
						}`,
						{
							title: `Failed: ${message}`,
						},
					)
				}`;

				if (message === 'timeout') {
					columns.push('-', '-', `${md.sup(':warning:')} ${md.code('+10,000 ms')}`);
				} else {
					columns.push('❌', '❌ ', '-');
				}
			} else {
				columns.push(
					displayColumn(
						byteSize(result.data.minifiedBytes).toString(),
						percent(artifact.size, result.data.minifiedBytes),
						minifierName === artifact.bestMinified?.[0],
					),
					displayColumn(
						byteSize(result.data.minzippedBytes).toString(),
						percent(artifact.gzipSize, result.data.minzippedBytes),
						minifierName === artifact.bestMinzipped?.[0],
					),
					displayColumn(
						formatMs(result.data.time),
						compareSpeed(result, artifact.bestSpeed?.[1].result as BenchmarkResultSuccessWithRuns),
						minifierName === artifact.bestSpeed?.[0],
					),
				);
			}

			return columns;
		}),
	],
	{
		align: ['left', 'right', 'right', 'right'],
	},
);

export const generateBenchmarks = (
	analyzedData: AnalyzedData,
	rounds: Record<string, string> | undefined,
) => analyzedData
	.map(
		([name, artifact]) => {
			const sections: string[] = [
				outdent`
				<picture>
					<source media="(prefers-color-scheme: dark)" srcset="${getBarChartUrl(name, artifact, artifact.minifiedWithScores, true)}">
					<img src="${getBarChartUrl(name, artifact, artifact.minifiedWithScores)}">
				</picture>
				`,
				md.el('div', { align: 'center' }, `\n\n${generateBenchmarkTable(name, artifact)}\n`),
			];

			const roundAnalysis = rounds?.[name];
			if (roundAnalysis) {
				sections.push(roundAnalysis);
			}

			return sections.join('\n\n');
		},
	)
	.join('\n\n----\n\n');
