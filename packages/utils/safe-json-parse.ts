export const safeJsonParse = (
	jsonString: string,
) => {
	try {
		return JSON.parse(jsonString) as unknown;
	} catch {
		console.error('Failed to parse JSON:', { jsonString });
		return null;
	}
};
