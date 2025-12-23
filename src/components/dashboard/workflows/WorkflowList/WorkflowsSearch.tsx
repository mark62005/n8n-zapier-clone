"use client";

import { useWorkflowsParams } from "@/hooks/workflows/use-workflows-params";
import EntitySearch from "../../entities/EntitySearch";
import { useEntitySearch } from "@/hooks/entities/use-entity-search";

function WorkflowsSearch() {
	const [params, setParams] = useWorkflowsParams();
	const { searchQuery, onSearchChange } = useEntitySearch({
		params,
		setParams,
	});

	return (
		<EntitySearch
			value={searchQuery}
			onChange={onSearchChange}
			placeholder="Search workflows"
		/>
	);
}
export default WorkflowsSearch;
