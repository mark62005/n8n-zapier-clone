"use client";

import { type Node as TNode } from "@xyflow/react";
import { type TGeminiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/gemini";
import { type TGeminiNodeProps } from "@/types/app/components/component-props/dashboard/nodes/ai/gemini";

import { GEMINI_CHANNEL_NAME } from "@/inngest/channels";

import { memo, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchGeminiRealtimeToken } from "@/actions/executions/gemini";

import BaseExecutionNode from "../../BaseExecutionNode";
import GeminiDialog from "./GeminiDialog";

function GeminiNode(props: TGeminiNodeProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const { setNodes } = useReactFlow();

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: GEMINI_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchGeminiRealtimeToken,
	});

	const nodeData = props.data;
	const description = nodeData?.userPrompt
		? `gemini-2.5-flash: ${nodeData.userPrompt.slice(0, 50)}...`
		: "Not configured";

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	function handleFormSubmit(values: TGeminiNodeSettingsFormValues) {
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
			<GeminiDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				defaultValues={nodeData}
				onSubmit={handleFormSubmit}
			/>

			<BaseExecutionNode
				{...props}
				id={props.id}
				Icon="/logos/gemini.svg"
				name="Gemini"
				description={description}
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

GeminiNode.displayName = "GeminiNode";

export default memo(GeminiNode);
