import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

/**
 * Hook to update a workflow
 */
export function useUpdateWorkflow() {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	return useMutation(
		trpc.workflows.updateWorkflow.mutationOptions({
			onSuccess: (data) => {
				toast.success(`Workflow "${data.name}" updated successfully.`);

				queryClient.invalidateQueries(
					trpc.workflows.getAllWorkflowsOfAUser.queryOptions({})
				);
				queryClient.invalidateQueries(
					trpc.workflows.getWorkflowOfAUserById.queryOptions({ id: data.id })
				);
			},
			onError: (error) => {
				toast.error(`Failed to update workflow: ${error.message}.`);
			},
		})
	);
}
