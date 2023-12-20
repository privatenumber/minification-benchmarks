import assert from 'assert';
import jsdom from 'jsdom-global';
import { createElement } from 'react';
import { render } from 'react-dom';
import { defineTest } from '../..';

jsdom(undefined, {
	pretendToBeVisual: true,
});

export default defineTest({
	preprocess: code => code.replaceAll('console.warn(', '('),

	run: ({ Button }) => {
		const app = document.createElement('div');
		document.body.append(app);

		const App = () => createElement(Button, null, 'rendered');
		render(createElement(App), app);

		assert(
			app.innerHTML === '<button type="button" class="ant-btn"><span>rendered</span></button>',
		);
	},
});
