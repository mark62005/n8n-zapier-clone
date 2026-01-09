import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

/**
 * Hook to update a credential
 */
export function useUpdateCredential() {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	return useMutation(
		trpc.credentials.updateById.mutationOptions({
			onSuccess: (data) => {
				toast.success(`Credential "${data.name}" updated successfully.`);

				queryClient.invalidateQueries(
					trpc.credentials.getManyOfAUser.queryOptions({})
				);
				queryClient.invalidateQueries(
					trpc.credentials.getOneById.queryOptions({
						id: data.id,
					})
				);
			},
			onError: (error) => {
				toast.error(`Failed to update credential: ${error.message}.`);
			},
		})
	);
}
