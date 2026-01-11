"use client";

import { type Node as TNode } from "@xyflow/react";
import { type TSlackNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/slack";
import { type TSlackNodeProps } from "@/types/app/components/component-props/dashboard/nodes/messagers/slack";

import { SLACK_CHANNEL_NAME } from "@/inngest/channels";

import { memo, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchSlackRealtimeToken } from "@/actions/executions/messagers/slack";

import BaseExecutionNode from "../../BaseExecutionNode";
import SlackDialog from "./SlackDialog";

function SlackNode(props: TSlackNodeProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const { setNodes } = useReactFlow();

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: SLACK_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchSlackRealtimeToken,
	});

	const nodeData = props.data;
	const description = nodeData?.content
		? `Send: ${nodeData.content.slice(0, 50)}...`
		: "Not configured";

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	function handleFormSubmit(values: TSlackNodeSettingsFormValues) {
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
			<SlackDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				defaultValues={nodeData}
				onSubmit={handleFormSubmit}
			/>

			<BaseExecutionNode
				{...props}
				id={props.id}
				Icon="/logos/slack.svg"
				name="Slack"
				description={description}
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

SlackNode.displayName = "SlackNode";

export default memo(SlackNode);
