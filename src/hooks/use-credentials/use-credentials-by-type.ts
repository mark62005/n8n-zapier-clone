import { type CredentialType } from "@/generated/prisma/enums";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

/**
 * Hook to fetch multiple credentials of a user by type
 */
export function useCredentialsByType(type: CredentialType) {
	const trpc = useTRPC();

	return useQuery(trpc.credentials.getManyByType.queryOptions({ type }));
}
