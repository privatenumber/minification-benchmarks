import outdent from 'outdent';
import type { MinifierLoaded } from '@minification-benchmarks/minifiers';
import { format } from 'date-fns';
import { byteSize } from '../../utils/byte-size.js';
import type { Data, Minifier } from '../../types.js';
import { formatMs } from '../formatting.js';

type Eliminated = Record<string, {
	reason: string;
	error: string;
}>;

const getEliminated = (
	data: Data,
) => {
	const eliminated: Eliminated = {};

	for (const [artifactName, artifact] of Object.entries(data)) {
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

const getFastestMinifier = (
	minifiers: [string, Minifier][],
) => {
	let fastestMinifier: [string, number] | undefined;
	for (const [minifierName, { result }] of minifiers) {
		if ('error' in result) {
			continue;
		}

		const { time } = result.data;
		if (
			!fastestMinifier
			|| time < fastestMinifier[1]
		) {
			fastestMinifier = [minifierName, time];
		}
	}

	return fastestMinifier![0];
};

export const getMessage = (
	minifiers: MinifierLoaded[],
	data: Data,
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
		Object.entries(data)
			.sort(([, artifactA], [, artifactB]) => artifactA.gzipSize - artifactB.gzipSize)
			.map(([artifactName, artifact], artifactIndex) => {
				const round = artifactIndex + 1;
				const minified = Object.entries(artifact.minified)
					.filter(([minifierName]) => !eliminated[minifierName])
					.sort(([, minA], [, minB]) => {
						if ('error' in minA.result) {
							return 1;
						}
						if ('error' in minB.result) {
							return -1;
						}
						return minA.result.data.minzippedBytes - minB.result.data.minzippedBytes;
					});

				const fastestMinifier = getFastestMinifier(minified);

				return outdent`
				## Round ${round}: npm package "${artifactName}" (${byteSize(artifact.gzipSize).toString()})
				${
					minified.map(([minifierName, { result }], index) => {
						if ('error' in result) {
							return outdent`
							❌ ${minifierName}: ${result.error.message}
							`;
						}

						const { minzippedBytes, time } = result.data;
						const percent = (minzippedBytes / artifact.gzipSize).toLocaleString(undefined, {
							style: 'percent',
						});
						return outdent`
						${index + 1}. ${minifierName}: ${byteSize(minzippedBytes).toString()} (${percent}) in ${formatMs(time)}
						`;
					}).join('\n')
				}

				- Fastest minifier: ${fastestMinifier}
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
