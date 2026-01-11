import {
	type NodeProps as TNodeProps,
	type Node as TNode,
} from "@xyflow/react";
import { type IHttpRequestNodeData } from "@/types/app/workflows/nodes";

type THttpRequestNodeType = TNode<IHttpRequestNodeData>;

export type THttpRequestNodeProps = TNodeProps<THttpRequestNodeType>;
