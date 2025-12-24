"use client";

import { useSuspenseWorkflowsOfAUser } from "@/hooks/workflows/use-suspense-workflows-of-a-user";
import WorkflowsEmptyView from "../WorkflowsEmptyView";
import EntityList from "../../entities/EntityList";
import WorkflowItem from "./WorkflowItem";

function WorkflowList() {
	const workflows = useSuspenseWorkflowsOfAUser();

	return (
		<EntityList
			items={workflows.data.workflows}
			getKey={(workflow) => workflow.id}
			renderItem={(workflow) => <WorkflowItem data={workflow} />}
			emptyView={<WorkflowsEmptyView />}
		/>
	);
}
export default WorkflowList;
