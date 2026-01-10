import type { NodeProps as TNodeProps, Node as TNode } from "@xyflow/react";
import type { IDiscordNodeData } from "@/types/app/workflows/nodes";

type TDiscordNodeType = TNode<IDiscordNodeData & Record<string, unknown>>;

export type TDiscordNodeSettingsFormProps = TNodeProps<TDiscordNodeType>;
