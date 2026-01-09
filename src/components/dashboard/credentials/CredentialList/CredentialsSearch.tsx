"use client";

import { useCredentialsParams } from "@/hooks/use-credentials";
import { useEntitySearch } from "@/hooks/entities/use-entity-search";

import EntitySearch from "../../entities/EntitySearch";

function CredentialsSearch() {
	const [params, setParams] = useCredentialsParams();
	const { searchQuery, onSearchChange } = useEntitySearch({
		params,
		setParams,
	});

	return (
		<EntitySearch
			value={searchQuery}
			onChange={onSearchChange}
			placeholder="Search credentials"
		/>
	);
}
export default CredentialsSearch;
