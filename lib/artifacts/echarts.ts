import 'jsdom-global/register.js';
import assert from 'assert';
import { requireString } from '../utils/require-string';
import { artifactMeta } from '../types';

export default artifactMeta({
	path: 'echarts',
	async test(code) {
		const echarts = requireString(code);

		document.body.innerHTML = '<div id="app"></div>';
		echarts.init(window.app, undefined, {
			width: 1,
			height: 1,
		});

		assert(
			window.app.innerHTML === '<div style="position: relative; width: 1px; height: 1px; padding: 0px; margin: 0px; border-width: 0px;"></div>',
		);
	},
});
