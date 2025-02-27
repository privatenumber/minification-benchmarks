import type { BenchmarkError } from '../bench/types.js';

const JSON_START = '<JSON>';
const JSON_END = '</JSON>';
export const safeJsonParse = (
	jsonString: string,
) => {
	const findParseStart = jsonString.indexOf(JSON_START);
	if (findParseStart === -1) {
		return {
			error: {
				message: 'Failed to find JSON start',
			},
		};
	}

	const findParseEnd = jsonString.indexOf(JSON_END, findParseStart);
	if (findParseEnd === -1) {
		return {
			error: {
				message: 'Failed to find JSON end',
			},
		};
	}

	jsonString = jsonString.slice(findParseStart + JSON_START.length, findParseEnd);

	try {
		return JSON.parse(jsonString) as unknown;
	} catch {
		const error: BenchmarkError = {
			error: {
				message: 'Failed to parse JSON',
			},
		};
		return error;
	}
};
