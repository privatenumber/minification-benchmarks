import 'jsdom-global/register.js';
import assert from 'assert';
import type * as echarts from 'echarts';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof echarts>({
	run: (echarts) => {
		const app = document.createElement('div');
		document.body.append(app);

		echarts.init(app, undefined, {
			width: 1,
			height: 1,
		});

		assert.ok(
			app.innerHTML === '<div style="position: relative; width: 1px; height: 1px; padding: 0px; margin: 0px; border-width: 0px;"></div>',
		);
	},
});
