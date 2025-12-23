import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

/**
 * Hook to fetch all workflows of a user using SuspenseQuery
 */
export function useSuspenseWorkflowsOfAUser() {
	const trpc = useTRPC();

	return useSuspenseQuery(trpc.workflows.getAllWorkflowsOfAUser.queryOptions());
}
