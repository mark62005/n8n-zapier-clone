import { IWorkflowsHeaderProps } from "@/types/app/components/component-props/dashboard/workflows/workflow-list/IWorkflowsHeaderProps";
import { useCreateWorkflow } from "@/hooks/workflows/use-create-workflow";
import EntityHeader from "../../entities/EntityHeader";

function WorkflowsHeader({ disabled }: IWorkflowsHeaderProps) {
	const createWorkflow = useCreateWorkflow();

	function handleCreate() {
		createWorkflow.mutate(undefined, {
			onError: (error) => {
				// TODO: Open upgrade modal
				console.error(error);
			},
		});
	}

	return (
		<>
			<EntityHeader
				title="Workflows"
				description="Create and manage your workflows"
				handleNewButtonClick={handleCreate}
				newButtonLabel="New Workflow"
				disabled={disabled}
				isCreating={createWorkflow.isPending}
			/>
		</>
	);
}
export default WorkflowsHeader;
