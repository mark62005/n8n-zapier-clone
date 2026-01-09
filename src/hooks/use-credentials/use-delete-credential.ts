import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook to delete a credential of a user by its ID
 */
export function useDeleteCredential() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	return useMutation(
		trpc.credentials.deleteById.mutationOptions({
			onSuccess: (data) => {
				toast.success(`Credential "${data.name}" removed successfully.`);

				queryClient.invalidateQueries(
					trpc.credentials.getManyOfAUser.queryOptions({})
				);
				queryClient.invalidateQueries(
					trpc.credentials.getOneById.queryFilter({ id: data.id })
				);
			},
		})
	);
}
