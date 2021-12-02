export const safeJsonParse = (
	jsonString: string,
) => {
	try {
		return JSON.parse(jsonString);
	} catch {
		console.log({ 'Failed to parse JSON': jsonString });
		return null;
	}
};
