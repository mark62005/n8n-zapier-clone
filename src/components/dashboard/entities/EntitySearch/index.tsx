"use client";

import { SearchIcon } from "lucide-react";
import { IEntitySearchProps } from "@/types/app/components/component-props/dashboard/entities/IEntitySearchProps";
import { Input } from "@/components/ui/input";

function EntitySearch({
	value,
	onChange,
	placeholder = "Search",
}: IEntitySearchProps) {
	return (
		<div className="relative ml-auto">
			<SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

			<Input
				value={value}
				onChange={(e) => onChange(e.target.value.trim())}
				placeholder={placeholder}
				className="max-w-[200px] bg-background shadow-none border-border pl-8"
			/>
		</div>
	);
}
export default EntitySearch;
