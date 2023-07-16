const originalLogs = {
	log: console.log,
	warn: console.warn,
	error: console.error,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const blockConsoleLog = () => {
	const methods = Object.keys(originalLogs) as Array<keyof typeof originalLogs>;

	for (const method of methods) {
		console[method] = noop;
	}

	// Restore original console methods
	return () => {
		for (const method of methods) {
			console[method] = originalLogs[method];
		}
	};
};
