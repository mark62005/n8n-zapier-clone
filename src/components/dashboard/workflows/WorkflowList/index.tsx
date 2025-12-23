"use client";

import { useSuspenseWorkflowsOfAUser } from "@/hooks/workflows/use-suspense-workflows-of-a-user";

function WorkflowList() {
	const workflows = useSuspenseWorkflowsOfAUser();

	return (
		<div className="flex-1 flex justify-center items-center">
			<p>{JSON.stringify(workflows.data, null, 2)}</p>
		</div>
	);
}
export default WorkflowList;
