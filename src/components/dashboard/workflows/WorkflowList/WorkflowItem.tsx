"use client";

import { formatDistanceToNow } from "date-fns";
import { IWorkflowItemProps } from "@/types/app/components/component-props/dashboard/workflows/workflow-list/IWorkflowItemProps";
import { useDeleteWorkflow } from "@/hooks/workflows/use-delete-workflow";
import { WorkflowIcon } from "lucide-react";
import EntityItem from "../../entities/EntityItem";

function WorkflowItem({ data }: IWorkflowItemProps) {
	const { id, name } = data;

	const deleteWorkflow = useDeleteWorkflow();

	const updatedTimeAgo = formatDistanceToNow(data.updatedAt, {
		addSuffix: true,
	});
	const createdTimeAgo = formatDistanceToNow(data.createdAt, {
		addSuffix: true,
	});

	function handleDeleteWorkflow() {
		deleteWorkflow.mutate({
			id,
		});
	}

	return (
		<EntityItem
			href={`/workflows/${id}`}
			title={name}
			subtitle={
				<>
					Updated {updatedTimeAgo} &bull; Created {createdTimeAgo}
				</>
			}
			image={
				<div className="size-8 flex items-center justify-center">
					<WorkflowIcon className="size-5 text-muted-foreground" />
				</div>
			}
			onRemove={handleDeleteWorkflow}
			isRemoving={deleteWorkflow.isPending}
		/>
	);
}
export default WorkflowItem;
