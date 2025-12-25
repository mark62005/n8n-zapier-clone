"use client";

import { IGeneralEditorProps } from "@/types/app/components/component-props/dashboard/editors/IGeneralEditorProps";
import { useSuspenseWorkflowById } from "@/hooks/workflows/use-suspense-workflow-by-id";

function Editor({ workflowId }: IGeneralEditorProps) {
	const { data: workflow } = useSuspenseWorkflowById(workflowId);

	return (
		<p>
			<span className=""></span>
			{JSON.stringify(workflow, null, 2)}
		</p>
	);
}
export default Editor;
