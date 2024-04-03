import type { MinifierLoaded } from '@minification-benchmarks/minifiers';

export type MinifierInstance = {
	minifier: MinifierLoaded;
	instance: string;
};
