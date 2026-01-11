"use client";

import { type IBaseExecutionNodeProps } from "@/types/app/components/component-props/dashboard/nodes";

import { memo } from "react";
import { Position, useReactFlow } from "@xyflow/react";

import Image from "next/image";
import {
	BaseNode,
	BaseNodeContent,
} from "@/components/ui/react-flow/base-node";
import { NodeStatusIndicator } from "@/components/ui/react-flow/node-status-indicator";
import { BaseHandle } from "@/components/ui/react-flow/base-handle";
import WorkflowNode from "../WorkflowNode";

function BaseExecutionNode({
	id,
	Icon,
	name,
	description,
	status = "initial",
	onSettings,
	onDoubleClick,
	children,
}: IBaseExecutionNodeProps) {
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
			<NodeStatusIndicator
				status={status}
				variant="border"
			>
				<BaseNode
					status={status}
					onDoubleClick={onDoubleClick}
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
							id="target-1"
							type="target"
							position={Position.Left}
						/>
						<BaseHandle
							id="source-1"
							type="source"
							position={Position.Right}
						/>
					</BaseNodeContent>
				</BaseNode>
			</NodeStatusIndicator>
		</WorkflowNode>
	);
}

BaseExecutionNode.displayName = "BaseExecutionNode";

export default memo(BaseExecutionNode);
