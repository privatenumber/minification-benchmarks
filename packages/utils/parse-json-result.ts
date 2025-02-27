import type { BenchmarkError } from '../bench/types.js';

export const parseJsonResult = (
	jsonString: string,
): unknown | BenchmarkError => {
	const findParseStart = jsonString.indexOf('{');
	if (findParseStart === -1) {
		return {
			error: {
				message: `Failed to find JSON start:\n${jsonString}`,
			},
		};
	}

	const findParseEnd = jsonString.lastIndexOf('}');
	if (findParseEnd === -1) {
		return {
			error: {
				message: `Failed to find JSON end:\n${jsonString}`,
			},
		};
	}

	jsonString = jsonString.slice(findParseStart, findParseEnd + 1);

	try {
		return JSON.parse(jsonString) as unknown;
	} catch {
		return {
			error: {
				message: `Failed to parse JSON:\n${jsonString}`,
			},
		};
	}
};
