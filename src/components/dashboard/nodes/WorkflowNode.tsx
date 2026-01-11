"use client";

import { type IWorkflowNodeProps } from "@/types/app/components/component-props/dashboard/nodes/IWorkflowNodeProps";

import { SettingsIcon, TrashIcon } from "lucide-react";
import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";

function WorkflowNode({
	children,
	name,
	description,
	showToolbar = true,
	onDelete,
	onSettings,
}: IWorkflowNodeProps) {
	return (
		<>
			{showToolbar && (
				<NodeToolbar>
					{/* SETTINGS BUTTON */}
					<Button
						size="sm"
						variant="ghost"
						onClick={onSettings}
					>
						<SettingsIcon className="size-4" />
					</Button>

					{/* DELETE BUTTON */}
					<Button
						size="sm"
						variant="ghost"
						onClick={onDelete}
					>
						<TrashIcon className="size-4" />
					</Button>
				</NodeToolbar>
			)}

			{children}

			{name && (
				<NodeToolbar
					position={Position.Bottom}
					isVisible
					className="max-w-[200px] text-center"
				>
					<p className="font-medium">{name}</p>

					{description && (
						<p className="text-muted-foreground truncate text-sm">
							{description}
						</p>
					)}
				</NodeToolbar>
			)}
		</>
	);
}
export default WorkflowNode;
