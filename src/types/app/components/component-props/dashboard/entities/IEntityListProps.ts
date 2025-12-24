import { ReactNode } from "react";

export interface IEntityListProps<T> {
	items: T[];
	renderItem: (item: T, index: number) => ReactNode;
	getKey?: (item: T, index: number) => string | number;
	emptyView?: ReactNode;
	className?: string;
}
