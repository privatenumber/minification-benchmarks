import { outdent } from 'outdent';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import { format } from 'date-fns';
import { byteSize } from '../../utils/byte-size.ts';
import { formatMs } from '../formatting.ts';
import type { AnalyzedData } from '../analyzed-data.ts';

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
