declare module 'quickchart-js' {
	import type { ChartConfiguration } from 'chart.js';

	export default class QuickChart {
		constructor(apiKey?: string, accountId?: string);
		setConfig(chartConfig: string | ChartConfiguration): QuickChart;
		setHost(host: string): QuickChart;
		setScheme(scheme: string): QuickChart;
		setWidth(width: number): QuickChart;
		setHeight(height: number): QuickChart;
		setBackgroundColor(color: string): QuickChart;
		setDevicePixelRatio(ratio: number): QuickChart;
		setFormat(fmt: string): QuickChart;
		setVersion(version: string): QuickChart;
		isValid(): boolean;
		getUrl(): string;
		getSignedUrl(): string;
		getShortUrl(): Promise<string>;
		toBinary(): Promise<Buffer>;
		toDataUrl(): Promise<string>;
		toFile(pathOrDescriptor: string): Promise<void>;
	}
}
