import assert from 'assert';
import jsdom from 'jsdom-global';
import { render } from 'react-dom';
import { defineTest } from '../..';

jsdom(undefined, {
	pretendToBeVisual: true,
});

export default defineTest({
	preprocess(code) {
		return code.replace(/console\.warn\(/g, '(');
	},

	run(React) {
		const app = document.createElement('div');
		document.body.append(app);

		const App = () => React.createElement('div', null, 'rendered');
		document.body.innerHTML = '<div id="app"></div>';
		render(React.createElement(App), app);

		assert(app.innerHTML === '<div>rendered</div>');
	},
});
