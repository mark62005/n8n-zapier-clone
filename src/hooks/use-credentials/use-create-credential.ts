import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

/**
 * Hook to create a credential for a user
 */
export function useCreateCredential() {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	return useMutation(
		trpc.credentials.create.mutationOptions({
			onSuccess: (data) => {
				toast.success(`Credential "${data.name}" created successfully.`);

				queryClient.invalidateQueries(
					trpc.credentials.getManyOfAUser.queryOptions({})
				);
			},
			onError: (error) => {
				toast.error(`Failed to create credential: ${error.message}.`);
			},
		})
	);
}
