"use client";

import {
	useSuspenseExecutionsOfAWorkflow,
	useExecutionsParams,
} from "@/hooks/use-executions";

import EntityPagination from "../../entities/EntityPagination";

function ExecutionsPagination() {
	const executions = useSuspenseExecutionsOfAWorkflow();
	const [params, setParams] = useExecutionsParams();

	function handlePageChange(page: number) {
		setParams({ ...params, page });
	}

	return (
		<EntityPagination
			page={executions.data.page}
			totalNumberOfPages={executions.data.totalNumberOfPages}
			onPageChange={handlePageChange}
			disabled={executions.isFetching}
		/>
	);
}
export default ExecutionsPagination;
