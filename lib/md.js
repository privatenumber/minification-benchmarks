const table = require('markdown-table');
const outdent = require('outdent');
const filesize = require('filesize');
const path = require('path');
const fs = require('fs');
const commentMark = require('comment-mark');

const formatTime = ms => `${ms.toFixed(2)}ms`;
const compressionRate = (from, to) => Math.floor((to / from) * 100) + '%';

const readme = ({
	minifiersList,
	results
}) => commentMark(fs.readFileSync('./readme.md'), {
	minifiersList,
	results,
});

const code = string => `\`${string}\``;

const moduleSection = ({
	pkg,
	pkgPath,
	size,
	gzipSize,
	benchmarks
}) => outdent`
	### ${pkg}
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
					(r.annotation.size ? r.annotation.size + ' ' : '') + `${code(filesize(r.size))} (${code(compressionRate(size, r.size))})`,
					(r.annotation.gzip ? r.annotation.gzip + ' ' : '') + `${code(filesize(r.gzipSize))} (${code(compressionRate(gzipSize, r.gzipSize))})`,
					(r.annotation.time ? r.annotation.time + ' ' : '') + code(formatTime(r.ms))
				] : [
					'⚠️ Failed',
					'⚠️ Failed',
					'⚠️ Failed'
				]
			)
		])
	], {
		align: ['l', 'r', 'r', 'r']
	})
}
` + '\n\n';

module.exports = {
	readme,
	code,
	moduleSection
};
