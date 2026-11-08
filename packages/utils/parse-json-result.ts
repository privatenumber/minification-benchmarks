export const parseJsonResult = (
	output: string,
): unknown => {
	const lines = output.split(/\r?\n/);
	for (let index = lines.length - 1; index >= 0; index -= 1) {
		if (lines[index].trim()) {
			try {
				return JSON.parse(lines[index]) as unknown;
			} catch {
				// Other output lines may contain warnings.
			}
		}
	}
	throw new Error('No JSON result found');
};
