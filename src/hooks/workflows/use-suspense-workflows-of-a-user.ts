import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useWorkflowsParams } from "./use-workflows-params";

/**
 * Hook to fetch all workflows of a user using SuspenseQuery
 */
export function useSuspenseWorkflowsOfAUser() {
	const trpc = useTRPC();
	const [params] = useWorkflowsParams();

	return useSuspenseQuery(
		trpc.workflows.getAllWorkflowsOfAUser.queryOptions(params)
	);
}
