import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook to delete a workflow of a user by its ID
 */
export function useDeleteWorkflow() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	return useMutation(
		trpc.workflows.deleteWorkflow.mutationOptions({
			onSuccess: (data) => {
				toast.success(`Workflow "${data.name}" removed successfully.`);

				queryClient.invalidateQueries(
					trpc.workflows.getAllWorkflowsOfAUser.queryOptions({})
				);
				queryClient.invalidateQueries(
					trpc.workflows.getWorkflowOfAUserById.queryFilter({ id: data.id })
				);
			},
		})
	);
}
