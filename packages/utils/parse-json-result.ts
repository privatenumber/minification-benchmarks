import type { BenchmarkError } from '../bench/types.js';

const JSON_START = '<JSON>';
const JSON_END = '</JSON>';
export const parseJsonResult = (
	jsonString: string,
): unknown | BenchmarkError => {
	const findParseStart = jsonString.indexOf(JSON_START);
	if (findParseStart === -1) {
		return {
			error: {
				message: 'Failed to find <JSON>:\n' + jsonString,
			},
		};
	}

	const findParseEnd = jsonString.indexOf(JSON_END, findParseStart);
	if (findParseEnd === -1) {
		return {
			error: {
				message: 'Failed to find </JSON>:\n' + jsonString,
			},
		};
	}

	jsonString = jsonString.slice(findParseStart + JSON_START.length, findParseEnd);

	try {
		return JSON.parse(jsonString) as unknown;
	} catch {
		return {
			error: {
				message: 'Failed to parse JSON:\n' + jsonString,
			},
		};
	}
};
