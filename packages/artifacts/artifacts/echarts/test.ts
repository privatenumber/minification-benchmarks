import 'jsdom-global/register.js';
import assert from 'assert';
import { defineTest } from '../..';

export default defineTest({
	run(echarts) {
		const app = document.createElement('div');
		document.body.append(app);

		echarts.init(app, undefined, {
			width: 1,
			height: 1,
		});

		assert(
			app.innerHTML === '<div style="position: relative; width: 1px; height: 1px; padding: 0px; margin: 0px; border-width: 0px;"></div>',
		);
	},
});
