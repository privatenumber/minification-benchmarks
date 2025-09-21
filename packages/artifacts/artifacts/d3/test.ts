import 'jsdom-global/register.js';
import assert from 'assert';
import type d3 from 'd3';
import { defineTest } from '../../utils/define-test.js';

export default defineTest<typeof d3>({
	run: (d3) => {
		document.body.innerHTML = '';

		const svg = d3.select(document.body)
			.append('svg')
			.attr('width', 100)
			.attr('height', 100);

		svg.append('circle')
			.style('fill', 'green')
			.attr('r', 40)
			.attr('cx', 50)
			.attr('cy', 50);

		assert.ok(
			document.body.innerHTML === '<svg width="100" height="100"><circle style="fill: green;" r="40" cx="50" cy="50"></circle></svg>',
		);
	},
});
