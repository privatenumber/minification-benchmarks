export const formatMs = (
	ms: number,
) => `${ms.toLocaleString(undefined, { maximumFractionDigits: 0 })} ms`;

const roundTo = (value: number, place = 0) => {
	const factor = 10 ** place;
	return Math.round(value * factor) / factor;
};

export const percent = (
	from: number,
	to: number,
) => roundTo((to - from) / from, 2).toLocaleString(undefined, {
	style: 'percent',
});
