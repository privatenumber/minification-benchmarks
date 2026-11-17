import type { MinifierLoaded } from '@minification-benchmarks/minifiers';

// Keyed by `meta.name`. Composer packages have no registry date and get no entry.
export const getPublishDates = async (
	minifiers: MinifierLoaded[],
) => new Map(await Promise.all(
	minifiers
		.filter(({ meta }) => meta.registry === 'npm')
		.map(async ({ meta }) => {
			const response = await fetch(`https://registry.npmjs.org/${meta.name}`);
			if (!response.ok) {
				throw new Error(`Failed to fetch npm metadata for ${meta.name}: HTTP ${response.status} ${response.statusText}`);
			}
			const json = await response.json() as { time: Record<string, string> };
			return [meta.name, new Date(json.time[meta.version])] as const;
		}),
));
