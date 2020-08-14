const table = require('markdown-table');
const outdent = require('outdent');
const filesize = require('filesize');
const path = require('path');

const formatTime = ms => `${ms.toFixed(2)}ms`;
const compressionRate = (from, to) => Math.floor((to / from) * 100) + '%';

const readme = ({
	minifiersList,
	results,
}) => outdent`
	# Minification benchmarks

	${minifiersList}

	## Results

	${results}
`;

const code = str => `\`${str}\``;

const moduleSection = ({
	package,
	pkgPath,
	size,
	gzipSize,
	benchmarks,
}) => outdent`
	### ${package}
	- **File** ${code(path.relative(process.cwd(), pkgPath))}
	- **Size** ${code(filesize(size))}
	- **Gzip size** ${code(filesize(gzipSize))}

	${
		table([
			['Minifier', 'Size', 'Gzip size', 'Time'],
			...benchmarks.map(r => [
				r.name,
				...(
					r.success ? [
						(r.best.size ? '🏆 ' : '') + `${code(filesize(r.size))} (${code(compressionRate(size, r.size))})`,
						(r.best.gzip ? '🏆 ' : '') + `${code(filesize(r.gzipSize))} (${code(compressionRate(gzipSize, r.gzipSize))})`,
						(r.best.time ? '🏆 ' : '') + code(formatTime(r.ms)),
					] : [
						'⚠️ Failed',
						'⚠️ Failed',
						'⚠️ Failed',
					]
				)
			]),
		], {
			align: ['l', 'r', 'r', 'r'],
		})
	}
` + '\n\n';


module.exports = {
	readme,
	code,
	moduleSection,
};
