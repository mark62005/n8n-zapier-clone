import type { NodeTypes as TNodeTypes } from "@xyflow/react";
import { NodeType } from "@/generated/prisma/enums";
import InitialNode from "@/components/dashboard/editors/nodes/InitialNode";

export const NODE_COMPONENTS_CONFIG = {
	[NodeType.INITIAL]: InitialNode,
} as const satisfies TNodeTypes;

export type TRegisteredNodeType = keyof typeof NODE_COMPONENTS_CONFIG;
