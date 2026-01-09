import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

/**
 * Hook to fetch a credential of a user by ID using SuspenseQuery
 */
export function useSuspenseCredentialById(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(trpc.credentials.getOneById.queryOptions({ id }));
}
