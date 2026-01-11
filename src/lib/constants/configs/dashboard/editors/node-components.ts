import type { NodeTypes as TNodeTypes } from "@xyflow/react";

import { NodeType } from "@/generated/prisma/enums";

import InitialNode from "@/components/dashboard/editors/nodes/InitialNode";
import HttpRequestNode from "@/components/dashboard/editors/nodes/executions/http-request/HttpRequestNode";
import DiscordNode from "@/components/dashboard/editors/nodes/executions/messagers/discord/DiscordNode";
import SlackNode from "@/components/dashboard/editors/nodes/executions/messagers/slack/SlackNode";
import GeminiNode from "@/components/dashboard/editors/nodes/executions/gemini/GeminiNode";
import OpenAiNode from "@/components/dashboard/editors/nodes/executions/open-ai/OpenAiNode";
import AnthropicNode from "@/components/dashboard/editors/nodes/executions/anthropic/AnthropicNode";
import ManualTriggerNode from "@/components/dashboard/editors/nodes/triggers/manual-triggers/ManualTriggerNode";
import GoogleFormTriggerNode from "@/components/dashboard/editors/nodes/triggers/google-form-triggers/GoogleFormTriggerNode";
import StripeTriggerNode from "@/components/dashboard/editors/nodes/triggers/stripe-triggers/StripeTriggerNode";

export const NODE_COMPONENTS_CONFIG = {
	[NodeType.INITIAL]: InitialNode,
	[NodeType.HTTP_REQUEST]: HttpRequestNode,

	/* AI NODES */
	[NodeType.GEMINI]: GeminiNode,
	[NodeType.OPENAI]: OpenAiNode,
	[NodeType.ANTHROPIC]: AnthropicNode,
	/* MESSAGER NODES */
	[NodeType.DISCORD]: DiscordNode,
	[NodeType.SLACK]: SlackNode,

	/* TRIGGERS */
	[NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
	[NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
	[NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
} as const satisfies TNodeTypes;

export type TRegisteredNodeType = keyof typeof NODE_COMPONENTS_CONFIG;
