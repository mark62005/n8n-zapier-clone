import type { inferInput as TInferInput } from "@trpc/tanstack-react-query";

import { prefetch, trpc } from "@/trpc/server";

type TInput = TInferInput<typeof trpc.executions.getManyOfAWorkflow>;

/**
 * Prefetch multiple executions history of a workflow
 */
export function prefetchExecutions(params: TInput) {
	return prefetch(trpc.executions.getManyOfAWorkflow.queryOptions(params));
}

/**
 * Prefetch a execution history of a workflow by Execution ID
 */
export function prefetchExecutionById(id: string) {
	return prefetch(trpc.executions.getOneById.queryOptions({ id }));
}
