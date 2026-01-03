import type { NodeProps as TNodeProps, Node as TNode } from "@xyflow/react";

interface IHttpRequestNodeData {
	endpoint?: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: string;
	[key: string]: unknown;
}

type THttpRequestNodeType = TNode<IHttpRequestNodeData>;

export type THttpRequestNodeSettingsFormProps =
	TNodeProps<THttpRequestNodeType>;
