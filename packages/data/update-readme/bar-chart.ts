import QuickChart from 'quickchart-js';
import type { Context } from 'chartjs-plugin-datalabels';
import type { Artifact } from '../types.js';
import { type MinifierWithScore, isSuccessful } from './analyzed-data.js';

/* eslint-disable no-bitwise */
const hash32 = (string_: string) => {
	let h = 2_166_136_261 >>> 0;
	for (let i = 0; i < string_.length;) {
		const cp = string_.codePointAt(i)!;
		h ^= cp;
		h = Math.imul(h, 16_777_619);
		i += cp > 0xFF_FF ? 2 : 1;
	}
	return h >>> 0;
};

const getColorFromName = (name: string, opacity = 1) => {
	const GOLDEN_ANGLE = 137.507_764_050_037_85;
	const hv = hash32(name);

	const h = (hv * GOLDEN_ANGLE) % 360;

	const sJitter = ((hv >>> 8) & 0xFF) / 255;
	const s = 75 + (sJitter - 0.5) * 15; // ~55–70%

	const lJitter = ((hv >>> 16) & 0xFF) / 255;
	const l = 50 + (lJitter - 0.5) * 15; // ~60–75%

	return `hsla(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%, ${opacity})`;
};
/* eslint-enable no-bitwise */

const byteFormatter = (n: number) => `${Intl.NumberFormat('en', {
	notation: 'compact',
	compactDisplay: 'short',
}).format(n)}B`;

const percentFormatter = (
	value: number,
	context: Context,
) => {
	const base = Number(context.chart?.data?.datasets?.[0]?.data?.[0] ?? 0);
	if (!base || value === base) { return ''; }
	return `${Math.round((value / base) * 100)}%`;
};

const lightMode = {
	text: '#333',
	gridLines: '#3333331a',
	zeroLine: '#33333340',
};

const darkMode = {
	text: '#f0f6fc',
	gridLines: '#f0f6fc1a',
	zeroLine: '#f0f6fc40',
};

export const getBarChartUrl = (
	name: string,
	artifact: Artifact,
	minifiedWithScores: MinifierWithScore[],
	isDarkMode?: boolean,
) => {
	const colors = isDarkMode ? darkMode : lightMode;
	const successfulMinifiers = minifiedWithScores.filter(isSuccessful);
	const labels = successfulMinifiers.map(m => m.minifierName);
	const minzippedData = successfulMinifiers.map(
		m => m.minifier.result.data.minzippedBytes,
	);

	const myChart = new QuickChart();
	myChart.setFormat('svg');
	myChart.setWidth(720);
	myChart.setHeight(400);
    myChart.setBackgroundColor('transparent');
	myChart.setConfig({
		type: 'bar',
		data: {
			labels: ['Original', ...labels],
			datasets: [
				{
					label: 'Gzipped Size',
					data: [artifact.gzipSize, ...minzippedData],
					backgroundColor: [
						'rgba(150, 150, 150, 0.7)',
						...labels.map(lbl => getColorFromName(lbl, 0.7)),
					],
					borderColor: [
						'rgb(150, 150, 150)',
						...labels.map(lbl => getColorFromName(lbl)),
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			title: {
				display: true,
				text: `${name} v${artifact.version}`,
				fontSize: 20,
				fontColor: colors.text,
			},
			legend: { display: false },
			scales: {
				xAxes: [
					{
						ticks: {
							fontColor: colors.text,
							maxRotation: 45,
							minRotation: 45,
						},
						gridLines: { display: false },
					},
				],
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							fontColor: colors.text,
							callback: byteFormatter,
							fontSize: 10,
						},
						scaleLabel: {
							display: true,
							labelString: 'Gzipped Size',
							fontColor: colors.text,
							fontSize: 14,
						},
						gridLines: {
							color: colors.gridLines,
							zeroLineColor: colors.zeroLine,
						},
					},
				],
			},
			plugins: {
				datalabels: {
					labels: {
						bytes: {
							anchor: 'end',
							align: 'top',
							formatter: byteFormatter,
							color: colors.text,
							font: { size: 11 },
						},
						percent: {
							anchor: 'center',
							align: 'center',
							formatter: percentFormatter,
							color: '#fff',
							font: {
								size: 11,
								weight: 'bold',
							},
							clamp: true,
						},
					},
				},
			},
		},
	});

	return myChart.getUrl();
};
