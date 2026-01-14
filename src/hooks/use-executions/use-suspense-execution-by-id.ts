import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

/**
 * Hook to fetch a execution of a workflow by ID using SuspenseQuery
 */
export function useSuspenseExecutionById(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(trpc.executions.getOneById.queryOptions({ id }));
}
