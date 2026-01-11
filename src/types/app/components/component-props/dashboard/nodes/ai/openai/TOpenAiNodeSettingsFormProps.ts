import {
	type NodeProps as TNodeProps,
	type Node as TNode,
} from "@xyflow/react";
import { type IOpenAiNodeData } from "@/types/app/workflows/nodes";

type TOpenAiNodeType = TNode<IOpenAiNodeData>;

export type TOpenAiNodeProps = TNodeProps<TOpenAiNodeType>;
