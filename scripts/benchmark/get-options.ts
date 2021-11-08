import assert from 'assert';
import path from 'path';
import typeFlag from 'type-flag';

export const getOptions = () => {
	const argv = typeFlag(process.argv.slice(2), {
		minifier: {
			type: String,
			alias: 'm',
		},
		outputPath: {
			type: String,
			alias: 'o',
		},
		testPath: {
			type: String,
			alias: 't',
		},
	});

	const [minifierName] = argv.flags.minifier;
	assert(minifierName?.length, 'Minifier name must be passed in');

	let [filePath] = argv._;
	assert(filePath?.length, 'File path must be passed in');

	filePath = path.resolve(filePath);

	let [outputPath] = argv.flags.outputPath;
	if (outputPath) {
		outputPath = path.resolve(outputPath);
	}

	let [testPath] = argv.flags.testPath;
	if (testPath) {
		testPath = path.resolve(testPath);
	}

	return {
		minifierName,
		filePath,
		outputPath,
		testPath,
	};
};
