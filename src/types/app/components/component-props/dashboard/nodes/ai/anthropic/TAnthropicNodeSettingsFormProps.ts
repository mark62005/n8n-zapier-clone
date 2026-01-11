import {
	type NodeProps as TNodeProps,
	type Node as TNode,
} from "@xyflow/react";
import { type IAnthropicNodeData } from "@/types/app/workflows/nodes";

type TAnthropicNodeType = TNode<IAnthropicNodeData>;

export type TAnthropicNodeProps = TNodeProps<TAnthropicNodeType>;
