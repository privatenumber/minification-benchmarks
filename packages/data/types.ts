export type Minifier = {
	version: string;
	result: {
		minifiedSize: string;
		minzippedSize: string;
		time: string;
		runs: number;
	};
};

export type Data = {
	[artifact: string]: {
		version: string;
		path: string;
		minified: {
			[minifier: string]: Minifier;
		};
	};
};
