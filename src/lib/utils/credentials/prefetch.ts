import type { inferInput as TInferInput } from "@trpc/tanstack-react-query";

import { prefetch, trpc } from "@/trpc/server";

type TInput = TInferInput<typeof trpc.credentials.getManyOfAUser>;

/**
 * Prefetch multiple credentials of a user
 */
export function prefetchCredentials(params: TInput) {
	return prefetch(trpc.credentials.getManyOfAUser.queryOptions(params));
}

/**
 * Prefetch a credential of a user by Credential ID
 */
export function prefetchCredentialById(id: string) {
	return prefetch(trpc.credentials.getOneById.queryOptions({ id }));
}
