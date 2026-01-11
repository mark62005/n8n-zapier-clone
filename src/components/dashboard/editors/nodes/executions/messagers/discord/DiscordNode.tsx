"use client";

import { type Node as TNode } from "@xyflow/react";
import { type TDiscordNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/discord";
import { type TDiscordNodeSettingsFormProps } from "@/types/app/components/component-props/dashboard/editors/nodes/messagers/discord";

import { DISCORD_CHANNEL_NAME } from "@/inngest/channels";

import { memo, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchDiscordRealtimeToken } from "@/actions/executions/messagers/discord";

import BaseExecutionNode from "../../BaseExecutionNode";
import DiscordDialog from "./DiscordDialog";

function DiscordNode(props: TDiscordNodeSettingsFormProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const { setNodes } = useReactFlow();

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: DISCORD_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchDiscordRealtimeToken,
	});

	const nodeData = props.data;
	const description = nodeData?.content
		? `Send: ${nodeData.content.slice(0, 50)}...`
		: "Not configured";

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	function handleFormSubmit(values: TDiscordNodeSettingsFormValues) {
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
			<DiscordDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				defaultValues={nodeData}
				onSubmit={handleFormSubmit}
			/>

			<BaseExecutionNode
				{...props}
				id={props.id}
				Icon="/logos/discord.svg"
				name="Discord"
				description={description}
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

DiscordNode.displayName = "DiscordNode";

export default memo(DiscordNode);
