import outdent from 'outdent';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import { format } from 'date-fns';
import { byteSize } from '../../utils/byte-size.js';
import { formatMs } from '../formatting.js';
import type { AnalyzedData } from '../analyzed-data.js';

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
				'error' in minified.result
				&& minified.result.error.message !== 'timeout'
				&& !eliminated[minifierName]
			) {
				eliminated[minifierName] = {
					reason: `Failed "${artifactName}" in ${minified.result.error.stage} stage`,
					error: minified.result.error.message,
				};
			}
		}
	}

	return eliminated;
};

export const getMessage = (
	minifiers: MinifierLoaded[],
	data: AnalyzedData,
) => {
	const eliminated = getEliminated(data);

	return outdent`
	# Minifiers
	${
		minifiers
			.map(minifier => `- ${minifier.name} v${minifier.meta.version}${minifier.meta.publishDate ? ` released ${format(minifier.meta.publishDate, 'yyyy-MM-dd')}` : ''}`)
			.join('\n')
	}

	# Race results
	${
		data
			.sort(([, artifactA], [, artifactB]) => artifactA.gzipSize - artifactB.gzipSize)
			.map(([artifactName, artifact], artifactIndex) => {
				const round = artifactIndex + 1;

				const mostBalanced = artifact.minifiedWithScores[0];
				if ('error' in mostBalanced.minifier.result) {
					throw new Error('wont happen');
				}

				const rankings: Record<string, {
					minifier: string;
					minzippedBytes: number;
					time: number;
				}> = {};

				rankings['Best gzip compression'] = {
					minifier: artifact.bestMinzipped![0],
					minzippedBytes: artifact.bestMinzipped![1].result.data.minzippedBytes,
					time: artifact.bestMinzipped![1].result.data.time,
				};
				rankings.Fastest = {
					minifier: artifact.bestSpeed![0],
					minzippedBytes: artifact.bestSpeed![1].result.data.minzippedBytes,
					time: artifact.bestSpeed![1].result.data.time,
				};
				rankings['Most balanced'] = {
					minifier: mostBalanced.minifierName,
					minzippedBytes: mostBalanced.minifier.result.data.minzippedBytes,
					time: mostBalanced.minifier.result.data.time,
				};

				const mentionedMinifiers = new Set(Object.values(rankings).map(r => r.minifier));
				const filteredMinified = artifact.minifiedWithScores.find(
					({ minifierName }) => !mentionedMinifiers.has(minifierName),
				);

				const honorableMention = filteredMinified!;
				if ('error' in honorableMention.minifier.result) {
					throw new Error('wont happen');
				}
				rankings['Honorable mention'] = {
					minifier: honorableMention.minifierName,
					minzippedBytes: honorableMention.minifier.result.data.minzippedBytes,
					time: honorableMention.minifier.result.data.time,
				};

				return outdent`
				## Round ${round}: npm package "${artifactName}" (${byteSize(artifact.gzipSize).toString()} gzipped)
				${
					Object.entries(rankings).map(([label, { minifier, minzippedBytes, time }]) => {
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
