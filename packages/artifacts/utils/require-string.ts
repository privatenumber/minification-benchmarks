import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';

export const requireString = (
	code: string,
) => {
	const vol = Volume.fromJSON({ '/index.js': code });
	const fsRequire = createFsRequire(vol);
	return fsRequire('/index');
};
