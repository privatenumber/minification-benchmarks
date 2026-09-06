/**
 * Runs async tasks with a fixed worker pool: at most `limit` tasks are
 * in-flight at any time. Results keep their task order regardless of
 * completion time. The first rejection — or an aborted signal — stops new
 * tasks from being scheduled.
 */
export const runWithConcurrency = async <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
	limit: number,
	abortSignal?: AbortSignal,
): Promise<T[]> => {
	const results = Array.from<T>({ length: tasks.length });
	let nextIndex = 0;
	let failed = false;

	const worker = async () => {
		while (!failed && !abortSignal?.aborted && nextIndex < tasks.length) {
			const index = nextIndex;
			nextIndex += 1;
			results[index] = await tasks[index]();
		}
	};

	try {
		const workers = Array.from(
			{ length: Math.min(limit, tasks.length) },
			() => worker(),
		);
		await Promise.all(workers);
	} catch (error) {
		failed = true;
		throw error;
	}

	return results;
};
