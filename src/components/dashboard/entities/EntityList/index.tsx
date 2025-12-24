import { cn } from "@/lib/utils";
import { IEntityListProps } from "@/types/app/components/component-props/dashboard/entities/IEntityListProps";

function EntityList<T>({
	items,
	renderItem,
	getKey,
	emptyView,
	className,
}: IEntityListProps<T>) {
	if (items.length === 0 && emptyView) {
		return (
			<div className="flex-1 flex justify-center items-center">
				<div className="max-w-sm mx-auto">{emptyView}</div>
			</div>
		);
	}

	return (
		<div className={cn("flex flex-col gap-y-4", className)}>
			{items.map((items, index) => (
				<div key={getKey ? getKey(items, index) : index}>
					{renderItem(items, index)}
				</div>
			))}
		</div>
	);
}
export default EntityList;
