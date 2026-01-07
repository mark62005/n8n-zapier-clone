import { type NodeType as TNodeType } from "@/generated/prisma/enums";
import { type TNodeExecutor } from "@/types/app/workflows/executions/executors";

import { NodeType } from "@/generated/prisma/enums";

import { manualTriggerExecutor } from "./executors/manual-trigger-executor";
import { httpRequestExecutor } from "./executors/http-request-executor";
import { googleFormTriggerExecutor } from "./executors";

export type TExecutorRegistry = Record<TNodeType, TNodeExecutor>;

export const executorRegistry: TExecutorRegistry = {
	[NodeType.INITIAL]: manualTriggerExecutor, // TODO: Create initialExecutor
	[NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
	[NodeType.HTTP_REQUEST]: httpRequestExecutor,
	[NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
};

export function getExecutor(type: TNodeType): TNodeExecutor {
	const executor = executorRegistry[type];

	if (!executor) {
		throw new Error(`No executor found for this node type: ${type}.`);
	}

	return executor;
}
