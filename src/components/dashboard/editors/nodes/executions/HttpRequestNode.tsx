"use client";

import { memo } from "react";
import {
	type NodeProps as TNodeProps,
	type Node as TNode,
} from "@xyflow/react";
import type { TNodeStatus } from "@/components/ui/react-flow/node-status-indicator";
import { GlobeIcon } from "lucide-react";
import BaseExecutionNode from "./BaseExecutionNode";

interface IHttpRequestNodeData {
	endpoint?: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: string;
	[key: string]: unknown;
}

type THttpRequestNodeType = TNode<IHttpRequestNodeData>;

function HttpRequestNode(props: TNodeProps<THttpRequestNodeType>) {
	const nodeData = props.data;
	const description = nodeData?.endpoint
		? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
		: "Not configured";

	const nodeStatus: TNodeStatus = "initial";

	function handleSettingsClick() {
		// TODO
	}

	function handleDoubleClick() {}

	return (
		<>
			<BaseExecutionNode
				{...props}
				id={props.id}
				Icon={GlobeIcon}
				name="HTTP Request"
				description={description}
				status={nodeStatus}
				onSettings={handleSettingsClick}
				onDoubleClick={handleDoubleClick}
			/>
		</>
	);
}

HttpRequestNode.displayName = "HttpRequestNode";

export default memo(HttpRequestNode);
