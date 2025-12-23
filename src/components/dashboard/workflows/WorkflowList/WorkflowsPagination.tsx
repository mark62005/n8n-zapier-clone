"use client";

import { useSuspenseWorkflowsOfAUser } from "@/hooks/workflows/use-suspense-workflows-of-a-user";
import EntityPagination from "../../entities/EntityPagination";
import { useWorkflowsParams } from "@/hooks/workflows/use-workflows-params";

function WorkflowsPagination() {
	const workflows = useSuspenseWorkflowsOfAUser();
	const [params, setParams] = useWorkflowsParams();

	function handlePageChange(page: number) {
		setParams({ ...params, page });
	}

	return (
		<EntityPagination
			page={workflows.data.page}
			totalNumberOfPages={workflows.data.totalNumberOfPages}
			onPageChange={handlePageChange}
			disabled={workflows.isFetching}
		/>
	);
}
export default WorkflowsPagination;
