import path from 'path';

const artifacts = [
	'lodash',
	'three',
	'vue/dist/vue.runtime.common.dev.js',
	'react/cjs/react.development.js',
	'moment',
	'd3/dist/d3.js',
	'jquery',
	// Can't use require resolve due to export map
	path.resolve('node_modules/terser/dist/bundle.min.js'),
	'antd/dist/antd.js',
	'echarts',
	'victory/dist/victory.js',
];

export default artifacts;
