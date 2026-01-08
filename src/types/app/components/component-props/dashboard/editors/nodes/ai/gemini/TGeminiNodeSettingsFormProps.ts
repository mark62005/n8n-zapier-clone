import type { NodeProps as TNodeProps, Node as TNode } from "@xyflow/react";
import type { IGeminiNodeData } from "@/types/app/workflows/nodes";

type TGeminiNodeType = TNode<IGeminiNodeData>;

export type TGeminiNodeSettingsFormProps = TNodeProps<TGeminiNodeType>;
