const originalLogs = {
	log: console.log,
	warn: console.warn,
	error: console.error,
};

const debug = (...args: any[]) => {
	if (process.env.DEBUG) {
		originalLogs.log.apply(console, args);
	}
};

export const blockConsole = () => {
	const methods = Object.keys(originalLogs) as Array<keyof typeof originalLogs>;

	for (const method of methods) {
		console[method] = debug;
	}

	// Restore original console methods
	const restore = () => {
		for (const method of methods) {
			console[method] = originalLogs[method];
		}
	};

	return {
		restore,
		...originalLogs,
	};
};
