export interface IUseEntitySearchProps<
	T extends { searchQuery: string; page: number },
> {
	params: T;
	setParams: (params: T) => void;
	debounceMs?: number;
}
