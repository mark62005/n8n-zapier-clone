"use client";

import { useSuspenseExecutionsOfAWorkflow } from "@/hooks/use-executions";

import ExecutionsEmptyView from "./ExecutionsEmptyView";
import EntityList from "../../entities/EntityList";
import ExecutionItem from "./ExecutionItem";

function ExecutionList() {
	const executions = useSuspenseExecutionsOfAWorkflow();

	return (
		<EntityList
			items={executions.data.executions}
			getKey={(execution) => execution.id}
			renderItem={(execution) => <ExecutionItem data={execution} />}
			emptyView={<ExecutionsEmptyView />}
		/>
	);
}
export default ExecutionList;
