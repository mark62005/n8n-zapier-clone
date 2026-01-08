import { type NodeType as TNodeType } from "@/generated/prisma/enums";
import { type TNodeExecutor } from "@/types/app/workflows/executions/executors";

import { NodeType } from "@/generated/prisma/enums";

import { httpRequestExecutor } from "./executors/http-request-executor";
import {
	geminiExecutor,
	openAiExecutor,
	anthropicExecutor,
	googleFormTriggerExecutor,
} from "./executors";
import { manualTriggerExecutor } from "./executors/manual-trigger-executor";
import { stripeTriggerExecutor } from "./executors/stripe-trigger-executor";

export type TExecutorRegistry = Record<TNodeType, TNodeExecutor>;

export const executorRegistry: TExecutorRegistry = {
	[NodeType.INITIAL]: manualTriggerExecutor, // TODO: Create initialExecutor
	[NodeType.HTTP_REQUEST]: httpRequestExecutor,
	/* AI NODES */
	[NodeType.GEMINI]: geminiExecutor,
	[NodeType.OPENAI]: openAiExecutor,
	[NodeType.ANTHROPIC]: anthropicExecutor,
	/* TRIGGERS */
	[NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
	[NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
	[NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
};

export function getExecutor(type: TNodeType): TNodeExecutor {
	const executor = executorRegistry[type];

	if (!executor) {
		throw new Error(`No executor found for this node type: ${type}.`);
	}

	return executor;
}
