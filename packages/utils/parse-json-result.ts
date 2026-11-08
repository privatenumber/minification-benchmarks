export const parseJsonResult = <T>(
	output: string,
	isResult: (value: unknown) => value is T,
): T => {
	const lines = output.split(/\r?\n/);
	for (let index = lines.length - 1; index >= 0; index -= 1) {
		if (lines[index].trim()) {
			try {
				const value = JSON.parse(lines[index]) as unknown;
				if (isResult(value)) {
					return value;
				}
			} catch {
				// Other output lines may contain warnings.
			}
		}
	}
	throw new Error('No JSON result found');
};
