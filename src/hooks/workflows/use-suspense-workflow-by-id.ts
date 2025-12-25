import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

/**
 * Hook to fetch a workflow of a user by ID using SuspenseQuery
 */
export function useSuspenseWorkflowById(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.workflows.getWorkflowOfAUserById.queryOptions({ id })
	);
}
