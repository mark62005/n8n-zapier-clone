"use client";

import { memo, useState } from "react";
import type { NodeProps as TNodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { PlaceholderNode } from "@/components/ui/react-flow/placeholder-node";
import WorkflowNode from "./WorkflowNode";
import NodeSelector from "./NodeSelector";

function InitialNode(props: TNodeProps) {
	const [selectorOpen, setSelectorOpen] = useState<boolean>(false);

	function handleClick() {
		setSelectorOpen(true);
	}

	return (
		<NodeSelector
			open={selectorOpen}
			onOpenChange={setSelectorOpen}
		>
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
		</NodeSelector>
	);
}

InitialNode.displayName = "InitialNode";

export default memo(InitialNode);
