import type { NodeProps as TNodeProps, Node as TNode } from "@xyflow/react";
import type { ISlackNodeData } from "@/types/app/workflows/nodes";

type TSlackNodeType = TNode<
	Omit<ISlackNodeData, "variableName"> & Record<string, unknown>
>;

export type TSlackNodeProps = TNodeProps<TSlackNodeType>;
