"use client";

import type { Node as TNode } from "@xyflow/react";
import type { TNodeStatus } from "@/components/ui/react-flow/node-status-indicator";
import type { THttpRequestNodeSettingsFormValues } from "@/types/app/components/forms/nodes/http-request/THttpRequestNodeSettingsForm";
import type { THttpRequestNodeSettingsFormProps } from "@/types/app/components/component-props/dashboard/editors/nodes/http-request/THttpRequestNodeSettingsFormProps";

import { memo, useState } from "react";
import { useReactFlow } from "@xyflow/react";

import { GlobeIcon } from "lucide-react";
import BaseExecutionNode from "../BaseExecutionNode";
import HttpRequestDialog from "./HttpRequestDialog";

function HttpRequestNode(props: THttpRequestNodeSettingsFormProps) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const { setNodes } = useReactFlow();

	const nodeStatus: TNodeStatus = "initial";

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
