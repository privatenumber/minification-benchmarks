import assert from 'assert';
import { Volume } from 'memfs';
import { createFsRequire } from 'fs-require';
import { artifactMeta } from '../types';
import 'jsdom-global/register.js';

export default artifactMeta({
	path: 'jquery',
	test(code) {
		const vol = Volume.fromJSON({ '/index.js': code });
		const fsRequire = createFsRequire(vol);
		const $ = fsRequire('/index');

		document.body.innerHTML = '<div id="findme">Hello</div>';

		assert($('#findme').text() === 'Hello');
	},
});
