"use client";

import { memo } from "react";
import type { NodeProps as TNodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { PlaceholderNode } from "@/components/ui/react-flow/placeholder-node";
import WorkflowNode from "./WorkflowNode";

function InitialNode(props: TNodeProps) {
	function handleClick() {
		console.log("PlaceholderNode clicked");
	}

	return (
		<WorkflowNode showToolbar={false}>
			<PlaceholderNode
				{...props}
				onClick={handleClick}
			>
				<div className="flex items-center justify-center cursor-pointer">
					<PlusIcon className="size-4" />
				</div>
			</PlaceholderNode>
		</WorkflowNode>
	);
}

InitialNode.displayName = "InitialNode";

export default memo(InitialNode);
