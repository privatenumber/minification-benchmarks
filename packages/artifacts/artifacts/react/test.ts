import assert from 'assert';
import jsdom from 'jsdom-global';
import { render } from 'react-dom';
import type react from 'react';
import { defineTest } from '../../utils/define-test.js';

jsdom(undefined, {
	pretendToBeVisual: true,
});

export default defineTest<typeof react>({
	preprocess: code => code.replaceAll('console.warn(', '('),

	run: (React) => {
		const app = document.createElement('div');
		document.body.append(app);

		const App = () => React.createElement('div', null, 'rendered');
		document.body.innerHTML = '<div id="app"></div>';
		render(React.createElement(App), app);

		assert.ok(app.innerHTML === '<div>rendered</div>');
	},
});
