const formatter = new Intl.NumberFormat('en', {
	notation: 'compact',
	compactDisplay: 'short',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
const byteSize = (bytes: number) => `${formatter.format(bytes).replace(/(\D+)$/, ' $1')}B`;

export { byteSize };
