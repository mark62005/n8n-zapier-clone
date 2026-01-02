"use client";

import { memo } from "react";
import Image from "next/image";
import { Position, useReactFlow } from "@xyflow/react";
import type { IBaseTriggerNodeProps } from "@/types/app/components/component-props/dashboard/editors/nodes/IBaseTriggerNodeProps";
import {
	BaseNode,
	BaseNodeContent,
} from "@/components/ui/react-flow/base-node";
import { BaseHandle } from "@/components/ui/react-flow/base-handle";
import WorkflowNode from "../WorkflowNode";

function BaseTriggerNode({
	id,
	Icon,
	name,
	description,
	// status,
	onSettings,
	onDoubleClick,
	children,
}: IBaseTriggerNodeProps) {
	const { setNodes, setEdges } = useReactFlow();

	function handleDelete() {
		setNodes((currentNodes) => {
			const filteredNodes = currentNodes.filter((node) => node.id !== id);

			return filteredNodes;
		});

		setEdges((currentEdges) => {
			const filteredEdges = currentEdges.filter(
				(edge) => edge.source !== id && edge.target !== id
			);

			return filteredEdges;
		});
	}

	return (
		<WorkflowNode
			name={name}
			description={description}
			onDelete={handleDelete}
			onSettings={onSettings}
		>
			{/* TODO: Wrap within  NodeStatusIndicator */}
			<BaseNode
				onDoubleClick={onDoubleClick}
				className="relative group rounded-l-2xl"
			>
				<BaseNodeContent>
					{typeof Icon === "string" ? (
						<Image
							src={Icon}
							alt={name}
							width={16}
							height={16}
						/>
					) : (
						<Icon className="size-4 text-muted-foreground" />
					)}

					{children}

					<BaseHandle
						id="source-1"
						type="source"
						position={Position.Right}
					/>
				</BaseNodeContent>
			</BaseNode>
		</WorkflowNode>
	);
}

BaseTriggerNode.displayName = "BaseTriggerNode";

export default memo(BaseTriggerNode);
