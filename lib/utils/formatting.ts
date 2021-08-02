export const formatMs = (
	ms: number,
) => `${ms.toLocaleString(undefined, { maximumFractionDigits: 0 })}ms`;

export const percent = (
	from: number,
	to: number,
) => ((to - from) / from).toLocaleString(undefined, {
	style: 'percent',
});
