"use client";

import { type Node as TNode } from "@xyflow/react";
import { type TAnthropicNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/anthropic";
import { type TAnthropicNodeSettingsFormProps } from "@/types/app/components/component-props/dashboard/editors/nodes/ai/anthropic";

import { ANTHROPIC_CHANNEL_NAME } from "@/inngest/channels";

import { memo, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchAnthropicRealtimeToken } from "@/actions/executions/anthropic";

import BaseExecutionNode from "../BaseExecutionNode";
import AnthropicDialog from "./AnthropicDialog";

function AnthropicNode(props: TAnthropicNodeSettingsFormProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const { setNodes } = useReactFlow();

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: ANTHROPIC_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchAnthropicRealtimeToken,
	});

	const nodeData = props.data;
	const description = nodeData?.userPrompt
		? `claude-opus-4-0: ${nodeData.userPrompt.slice(0, 50)}...`
		: "Not configured";

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	function handleFormSubmit(values: TAnthropicNodeSettingsFormValues) {
		setNodes((nodes: TNode[]) =>
			nodes.map((node: TNode) => {
				if (node.id === props.id) {
					return {
						...node,
						data: {
							...node.data,
							...values,
						},
					};
				}

				return node;
			})
		);
	}

	return (
		<>
			<AnthropicDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				defaultValues={nodeData}
				onSubmit={handleFormSubmit}
			/>

			<BaseExecutionNode
				{...props}
				id={props.id}
				Icon="/logos/anthropic.svg"
				name="Anthropic"
				description={description}
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

AnthropicNode.displayName = "AnthropicNode";

export default memo(AnthropicNode);
