import assert from 'assert';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'lodash',
	test(code) {
		const _ = requireString(code);

		assert(_.flow([_.add, x => x * x])(2, 3) === 25);
	},
});
