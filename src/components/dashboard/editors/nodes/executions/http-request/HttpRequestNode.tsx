"use client";

import type { Node as TNode } from "@xyflow/react";
import type { THttpRequestNodeSettingsFormValues } from "@/types/app/components/forms/nodes/http-request";
import type { THttpRequestNodeSettingsFormProps } from "@/types/app/components/component-props/dashboard/editors/nodes/http-request";

import { HTTP_REQUEST_CHANNEL_NAME } from "@/inngest/channels/http-request-channel";

import { memo, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useNodeStatus } from "@/hooks/workflows/nodes/use-node-status";
import { fetchHttpRequestRealtimeToken } from "@/actions/executions/http-request/actions";

import { GlobeIcon } from "lucide-react";
import BaseExecutionNode from "../BaseExecutionNode";
import HttpRequestDialog from "./HttpRequestDialog";

function HttpRequestNode(props: THttpRequestNodeSettingsFormProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const { setNodes } = useReactFlow();

	const nodeStatus = useNodeStatus({
		nodeId: props.id,
		channel: HTTP_REQUEST_CHANNEL_NAME,
		topic: "status",
		refreshToken: fetchHttpRequestRealtimeToken,
	});

	const nodeData = props.data;
	const description = nodeData?.endpoint
		? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
		: "Not configured";

	function handleOpenSettings() {
		setDialogOpen(true);
	}

	function handleFormSubmit(values: THttpRequestNodeSettingsFormValues) {
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
			<HttpRequestDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				defaultValues={nodeData}
				onSubmit={handleFormSubmit}
			/>

			<BaseExecutionNode
				{...props}
				id={props.id}
				Icon={GlobeIcon}
				name="HTTP Request"
				description={description}
				status={nodeStatus}
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
			/>
		</>
	);
}

HttpRequestNode.displayName = "HttpRequestNode";

export default memo(HttpRequestNode);
