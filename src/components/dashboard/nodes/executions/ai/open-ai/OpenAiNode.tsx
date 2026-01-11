"use client";

import { type Node as TNode } from "@xyflow/react";
import { type TOpenAiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/openai";
import { type TOpenAiNodeProps } from "@/types/app/components/component-props/dashboard/nodes/ai/openai";

import { OPENAI_CHANNEL_NAME } from "@/inngest/channels";

import { memo, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchOpenAiRealtimeToken } from "@/actions/executions/openai";

import BaseExecutionNode from "../../BaseExecutionNode";
import OpenAiDialog from "./OpenAiDialog";

function OpenAiNode(props: TOpenAiNodeProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const { setNodes } = useReactFlow();

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: OPENAI_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchOpenAiRealtimeToken,
	});

	const nodeData = props.data;
	const description = nodeData?.userPrompt
		? `gpt-4: ${nodeData.userPrompt.slice(0, 50)}...`
		: "Not configured";

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	function handleFormSubmit(values: TOpenAiNodeSettingsFormValues) {
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
			<OpenAiDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				defaultValues={nodeData}
				onSubmit={handleFormSubmit}
			/>

			<BaseExecutionNode
				{...props}
				id={props.id}
				Icon="/logos/openai.svg"
				name="OpenAI"
				description={description}
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

OpenAiNode.displayName = "OpenAiNode";

export default memo(OpenAiNode);
