const stringifyAttributes = (
	attributes: Record<string, string | undefined>,
) => (
	Object.entries(attributes)
		.map(([key, value]) => (
			value === undefined
				? ''
				: ` ${key}=${JSON.stringify(value.replaceAll('"', '\''))}`
		))
		.join('')
);

export const c = (content: string) => `\`${content}\``;
export const sup = (content: string) => `<sup>${content}</sup>`;
export const sub = (content: string, title?: string) => `<sub${stringifyAttributes({ title })}>${content}</sub>`;
export const strong = (content: string) => `**${content}**`;
export const emphasize = (content: string) => `*${content}*`;
export const link = (label: string, href: string) => `[${label}](${href})`;
