type Attributes = Record<string, string | undefined>;

const stringifyAttributes = (
	attributes?: Attributes,
) => (
	attributes
		? Object.entries(attributes)
			.map(([key, value]) => (
				value === undefined
					? ''
					: ` ${key}=${JSON.stringify(value.replaceAll('"', '\''))}`
			))
			.join('')
		: ''
);

export const c = (content: string) => `\`${content}\``;
export const sup = (content: string) => `<sup>${content}</sup>`;
export const sub = (content: string, attributes?: Attributes) => `<sub${stringifyAttributes(attributes)}>${content}</sub>`;
export const strong = (content: string) => `**${content}**`;
export const emphasize = (content: string) => `*${content}*`;
export const link = (label: string, href: string) => `[${label}](${href})`;
export const div = (content: string, attributes?: Attributes) => `<div${stringifyAttributes(attributes)}>\n\n${content}\n</div>`;
