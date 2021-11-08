import 'jsdom-global/register.js';
import assert from 'assert';
import { createElement } from 'react';
import { render } from 'react-dom';
import { defineTest } from '../..';

export default defineTest({
	preprocess(code) {
		return code.replace(/console\.warn\(/g, '(');
	},

	run({ Button }) {
		const app = document.createElement('div');
		document.body.append(app);

		const App = () => createElement(Button, null, 'rendered');
		render(createElement(App), app);

		assert(
			app.innerHTML === '<button type="button" class="ant-btn"><span>rendered</span></button>',
		);
	},
});
