"use client";

import { useRouter } from "next/navigation";
import { IWorkflowsHeaderProps } from "@/types/app/components/component-props/dashboard/workflows/workflow-list/IWorkflowsHeaderProps";
import { useCreateWorkflow } from "@/hooks/workflows/use-create-workflow";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import EntityHeader from "../../entities/EntityHeader";

function WorkflowsHeader({ disabled }: IWorkflowsHeaderProps) {
	const router = useRouter();
	const createWorkflow = useCreateWorkflow();
	const { handleError, upgradeModal } = useUpgradeModal();

	function handleCreate() {
		createWorkflow.mutate(undefined, {
			onSuccess: (data) => {
				router.push(`/workflows/${data.id}`);
			},
			onError: (error) => {
				handleError(error);
			},
		});
	}

	return (
		<>
			{upgradeModal}

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
