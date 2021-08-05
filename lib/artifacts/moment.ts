import assert from 'assert';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'moment',
	test(code) {
		const moment = requireString(code);

		assert(
			moment.duration('9.22:23:24.25').asSeconds() === 858204.25,
		);
	},
});
