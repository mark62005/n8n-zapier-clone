import type { NodeTypes as TNodeTypes } from "@xyflow/react";
import { NodeType } from "@/generated/prisma/enums";
import InitialNode from "@/components/dashboard/editors/nodes/InitialNode";
import HttpRequestNode from "@/components/dashboard/editors/nodes/executions/HttpRequestNode";
import ManualTriggerNode from "@/components/dashboard/editors/nodes/triggers/manual-triggers/ManualTriggerNode";
import GoogleFormTriggerNode from "@/components/dashboard/editors/nodes/triggers/google-form-triggers/GoogleFormTriggerNode";
import StripeTriggerNode from "@/components/dashboard/editors/nodes/triggers/stripe-triggers/StripeTriggerNode";

export const NODE_COMPONENTS_CONFIG = {
	[NodeType.INITIAL]: InitialNode,
	[NodeType.HTTP_REQUEST]: HttpRequestNode,
	[NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
	[NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
	[NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
} as const satisfies TNodeTypes;

export type TRegisteredNodeType = keyof typeof NODE_COMPONENTS_CONFIG;
