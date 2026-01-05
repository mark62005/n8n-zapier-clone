import { useExecuteWorkflow } from "@/hooks/workflows/use-execute-workflow";

import { FlaskConicalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function ExecuteWorkflowButton({ workflowId }: { workflowId: string }) {
	const executeWorkflow = useExecuteWorkflow();

	function handleExecute() {
		executeWorkflow.mutate({ id: workflowId });
	}

	return (
		<Button
			size="lg"
			onClick={handleExecute}
			disabled={executeWorkflow.isPending}
		>
			<FlaskConicalIcon className="size-4" />
			Execute workflow
		</Button>
	);
}
export default ExecuteWorkflowButton;
