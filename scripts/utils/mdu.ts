export const c = (content: string) => `\`${content}\``;
export const sup = (content: string) => `<sup>${content}</sup>`;
export const sub = (content: string) => `<sub>${content}</sub>`;
export const strong = (content: string) => `**${content}**`;
export const emphasize = (content: string) => `*${content}*`;
export const link = (label: string, href: string) => `[${label}](${href})`;
