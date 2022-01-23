const originalLogs = {
	log: console.log,
	warn: console.warn,
	error: console.error,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function blockConsoleLog() {
	const methods = Object.keys(originalLogs) as Array<keyof typeof originalLogs>;

	for (const method of methods) {
		console[method] = noop;
	}

	return function restore() {
		for (const method of methods) {
			console[method] = originalLogs[method];
		}
	};
}
