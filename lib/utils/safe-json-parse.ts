export const safeJsonParse = (
	jsonString: string,
) => {
	try {
		return JSON.parse(jsonString);
	} catch {
		return null;
	}
};
