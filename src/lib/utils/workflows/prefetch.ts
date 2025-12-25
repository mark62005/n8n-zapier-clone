import type { inferInput as TInferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type TInput = TInferInput<typeof trpc.workflows.getAllWorkflowsOfAUser>;

/**
 * Prefetch all workflows of a user
 */
export function prefetchWorkflows(params: TInput) {
	return prefetch(trpc.workflows.getAllWorkflowsOfAUser.queryOptions(params));
}

/**
 * Prefetch a workflow of a user
 */
export function prefetchWorkflowById(id: string) {
	return prefetch(trpc.workflows.getWorkflowOfAUserById.queryOptions({ id }));
}
