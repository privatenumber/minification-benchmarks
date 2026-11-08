import { outdent } from 'outdent';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import { format } from 'date-fns';
import { byteSize } from '../../utils/byte-size.ts';
import { formatMs } from '../formatting.ts';
import { getChampion, isEliminated, type AnalyzedData } from '../analyzed-data.ts';

type Eliminated = Record<string, {
	reason: string;
	error: string;
}>;

const getEliminated = (
	data: AnalyzedData,
) => {
	const eliminated: Eliminated = {};

	for (const [artifactName, artifact] of data) {
		for (const [minifierName, minified] of Object.entries(artifact.minified)) {
			if (
				isEliminated(minified.result)
				&& 'error' in minified.result
				&& !eliminated[minifierName]
			) {
				eliminated[minifierName] = {
					reason: `Failed "${artifactName}"${minified.result.error.stage ? ` in ${minified.result.error.stage} stage` : ''}`,
					error: minified.result.error.message,
				};
			}
		}
	}

	return eliminated;
};

export const getMessage = (
	minifiers: MinifierLoaded[],
	publishDates: Map<string, Date>,
	data: AnalyzedData,
) => {
	const eliminated = getEliminated(data);
	const { champion, standings } = getChampion(data);
	const runnerUp = standings[1];

	return outdent`
	# Minifiers
	${
		minifiers
			.map((minifier) => {
				const publishDate = publishDates.get(minifier.meta.name);
				return `- ${minifier.name} v${minifier.meta.version}${publishDate ? ` released ${format(publishDate, 'yyyy-MM-dd')}` : ''}`;
			})
			.join('\n')
	}

	# Champion
	${champion ? `The benchmark's champion is ${champion.name}, with ${champion.wins} round wins out of ${data.length}.` : 'The benchmark has no champion.'}
	${runnerUp ? `Runner-up: ${runnerUp.name}, with ${runnerUp.wins} round wins.` : ''}

	# Race results
	${
		data.slice()
			.sort(([, artifactA], [, artifactB]) => artifactA.gzipSize - artifactB.gzipSize)
			.map(([artifactName, artifact], artifactIndex) => {
				const round = artifactIndex + 1;

				const rankings: {
					label: string;
					minifier: string;
					minzippedBytes: number;
					time: number;
				}[] = [];
				const mostBalanced = artifact.minifiedWithScores.find(({ minifier }) => 'data' in minifier.result);
				const candidates = [
					['Best gzip compression', artifact.bestMinzipped],
					['Fastest', artifact.bestSpeed],
					['Most balanced', mostBalanced ? [[mostBalanced.minifierName, mostBalanced.minifier] as const] : []],
				] as const;
				for (const [label, winners] of candidates) {
					for (const [minifierName, minifier] of winners) {
						if ('data' in minifier.result) {
							rankings.push({
								label,
								minifier: minifierName,
								minzippedBytes: minifier.result.data.minzippedBytes,
								time: minifier.result.data.time,
							});
						}
					}
				}

				const mentionedMinifiers = new Set(rankings.map(r => r.minifier));
				const filteredMinified = artifact.minifiedWithScores.find(
					({ minifierName, minifier }) => !mentionedMinifiers.has(minifierName) && 'data' in minifier.result,
				);

				if (filteredMinified && 'data' in filteredMinified.minifier.result) {
					rankings.push({
						label: 'Honorable mention',
						minifier: filteredMinified.minifierName,
						minzippedBytes: filteredMinified.minifier.result.data.minzippedBytes,
						time: filteredMinified.minifier.result.data.time,
					});
				}

				return outdent`
				## Round ${round}: npm package "${artifactName}" (${byteSize(artifact.gzipSize).toString()} gzipped)
				${
					rankings.map(({
						label, minifier, minzippedBytes, time,
					}) => {
						const percentShaved = (
							(artifact.gzipSize - minzippedBytes) / artifact.gzipSize
						).toLocaleString(undefined, { style: 'percent' });
						return outdent`
						- ${label}: ${minifier}: ${byteSize(minzippedBytes).toString()} (${percentShaved} shaved) in ${formatMs(time)}
						`;
					}).join('\n')
				}
				`;
			})
			.join('\n\n')
	}

	# Eliminated
	${
		Object.entries(eliminated).map(([minifierName, { reason, error }]) => outdent`
		## ${minifierName}
		${reason}:
		${JSON.stringify(error)}
		`).join('\n\n')
	}
	`;
};
