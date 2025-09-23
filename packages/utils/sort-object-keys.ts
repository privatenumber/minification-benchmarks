type SortComparator<T> = (a: T, b: T) => number;

export const sortObjectKeys = <T extends Record<string, unknown>>(
	object: T,
	comparator: SortComparator<[keyof T & string, T[keyof T]]>,
): T => (
	Object.fromEntries(
		Object.entries(object).sort(comparator as SortComparator<[keyof T, unknown]>),
	) as T
);
