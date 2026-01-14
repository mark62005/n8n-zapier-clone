import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useExecutionsParams } from "./use-executions-params";

/**
 * Hook to fetch all executions of a user using SuspenseQuery
 */
export function useSuspenseExecutionsOfAWorkflow() {
	const trpc = useTRPC();
	const [params] = useExecutionsParams();

	return useSuspenseQuery(
		trpc.executions.getManyOfAWorkflow.queryOptions(params)
	);
}
