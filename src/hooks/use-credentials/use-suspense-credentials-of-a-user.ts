import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCredentialsParams } from "./use-credentials-params";

/**
 * Hook to fetch all credentials of a user using SuspenseQuery
 */
export function useSuspenseCredentialsOfAUser() {
	const trpc = useTRPC();
	const [params] = useCredentialsParams();

	return useSuspenseQuery(trpc.credentials.getManyOfAUser.queryOptions(params));
}
