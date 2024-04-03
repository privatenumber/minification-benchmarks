export type Minifier = {
	version: string;
	result: {
		minifiedSize: string;
		minzippedSize: string;
		time: string;
		runs: number;
	};
};

export type Artifact = {
	version: string;
	filePath: string;
	minified: {
		[minifierName: string]: Minifier;
	};
};

export type Data = {
	[artifact: string]: Artifact;
};
