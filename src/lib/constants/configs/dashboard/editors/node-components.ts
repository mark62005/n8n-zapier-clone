import type { NodeTypes as TNodeTypes } from "@xyflow/react";
import { NodeType } from "@/generated/prisma/enums";
import InitialNode from "@/components/dashboard/editors/nodes/InitialNode";
import HttpRequestNode from "@/components/dashboard/editors/nodes/executions/HttpRequestNode";
import ManualTriggerNode from "@/components/dashboard/editors/nodes/triggers/ManualTriggerNode";

export const NODE_COMPONENTS_CONFIG = {
	[NodeType.INITIAL]: InitialNode,
	[NodeType.HTTP_REQUEST]: HttpRequestNode,
	[NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies TNodeTypes;

export type TRegisteredNodeType = keyof typeof NODE_COMPONENTS_CONFIG;
