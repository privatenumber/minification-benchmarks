import { setTimeout as sleep } from 'node:timers/promises';
import { expect, test } from 'manten';
import { runWithConcurrency } from '../../update-readme/ai-analysis/run-with-concurrency.ts';

test('preserves result order regardless of completion time', async () => {
	const delays = [30, 10, 20];
	const results = await runWithConcurrency(
		delays.map(delay => async () => {
			await sleep(delay);
			return delay;
		}),
		3,
	);

	expect(results).toStrictEqual(delays);
});

test('never exceeds the concurrency limit', async () => {
	let active = 0;
	let peak = 0;

	const tasks = Array.from({ length: 9 }, () => async () => {
		active += 1;
		peak = Math.max(peak, active);
		await sleep(10);
		active -= 1;
		return true;
	});

	await runWithConcurrency(tasks, 3);

	expect(peak).toBe(3);
});

test('rejects with the first error and stops scheduling new tasks', async () => {
	let started = 0;

	const tasks = Array.from({ length: 6 }, (_, index) => async () => {
		started += 1;
		await sleep(10);
		if (index === 0) {
			throw new Error('boom');
		}
		return index;
	});

	await expect(runWithConcurrency(tasks, 2)).rejects.toThrow('boom');
	expect(started).toBeLessThan(6);
});

test('stops scheduling queued tasks once the signal aborts', async () => {
	const controller = new AbortController();
	let started = 0;

	const tasks = Array.from({ length: 6 }, (_, index) => async () => {
		started += 1;
		await sleep(10);
		if (index === 0) {
			controller.abort();
		}
		return index;
	});

	const results = await runWithConcurrency(tasks, 1, controller.signal);

	// The single worker stops after the aborting task completes
	expect(started).toBe(1);
	expect(results[0]).toBe(0);
});
