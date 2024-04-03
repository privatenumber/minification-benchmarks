export const safeJsonParse = (
	jsonString: string,
) => {
	try {
		return JSON.parse(jsonString);
	} catch {
		console.error('Failed to parse JSON:', { jsonString });
		return null;
	}
};
