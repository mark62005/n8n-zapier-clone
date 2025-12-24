"use client";

import { useRouter } from "next/navigation";
import { useCreateWorkflow } from "@/hooks/workflows/use-create-workflow";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import EmptyView from "../entities/EmptyView";

function WorkflowsEmptyView() {
	const router = useRouter();
	const createWorkflow = useCreateWorkflow();
	const { handleError, upgradeModal } = useUpgradeModal();

	function handleCreateClick() {
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
			<EmptyView
				variant="empty"
				titleLabel="No workflows"
				message="You haven't created any workflows yet. Get started by creating your first workflow."
				onNew={handleCreateClick}
				addNewButtonLabel="Create workflow"
			/>
		</>
	);
}
export default WorkflowsEmptyView;
