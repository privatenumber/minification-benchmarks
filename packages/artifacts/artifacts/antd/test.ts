import assert from 'assert';
import jsdom from 'jsdom-global';
import { createElement } from 'react';
import { render } from 'react-dom';
import type antd from 'antd';
import { defineTest } from '../../utils/define-test.js';

jsdom(undefined, {
	pretendToBeVisual: true,
});

export default defineTest<typeof antd>({
	// TODO: Dont we silence console logs? removable?
	preprocess: code => code.replaceAll('console.warn(', '('),

	run: ({ Button }) => {
		const app = document.createElement('div');
		document.body.append(app);

		const App = () => createElement(Button, null, 'rendered');
		render(createElement(App), app);

		assert.ok(
			app.innerHTML === '<button type="button" class="ant-btn"><span>rendered</span></button>',
		);
	},
});
