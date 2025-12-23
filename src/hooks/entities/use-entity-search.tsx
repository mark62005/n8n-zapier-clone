import { useState, useEffect } from "react";
import { IUseEntitySearchProps } from "@/types/app/hook-props/entities/IUseEntitySearchProps";
import { PAGINATION } from "@/lib/constants/configs/dashboard/Pagination";

export function useEntitySearch<
	T extends { searchQuery: string; page: number },
>({ params, setParams, debounceMs = 500 }: IUseEntitySearchProps<T>) {
	const [localSearchQuery, setLocalSearchQuery] = useState(params.searchQuery);

	useEffect(() => {
		if (localSearchQuery === "" && params.searchQuery !== "") {
			setParams({
				...params,
				searchQuery: "",
				page: PAGINATION.DEFAULT_PAGE,
			});

			return;
		}

		const timer = setTimeout(() => {
			if (localSearchQuery !== params.searchQuery) {
				setParams({
					...params,
					searchQuery: localSearchQuery,
					page: PAGINATION.DEFAULT_PAGE,
				});
			}
		}, debounceMs);

		return () => clearTimeout(timer);
	}, [localSearchQuery, params, setParams, debounceMs]);

	useEffect(() => {
		setLocalSearchQuery(params.searchQuery);
	}, [params.searchQuery]);

	return {
		searchQuery: localSearchQuery,
		onSearchChange: setLocalSearchQuery,
	};
}
