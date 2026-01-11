import type { NodeProps as TNodeProps, Node as TNode } from "@xyflow/react";
import type { IDiscordNodeData } from "@/types/app/workflows/nodes";

type TDiscordNodeType = TNode<
	Omit<IDiscordNodeData, "variableName"> & Record<string, unknown>
>;

export type TDiscordNodeProps = TNodeProps<TDiscordNodeType>;
