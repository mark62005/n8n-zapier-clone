import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

/**
 * Hook to execute a workflow
 */
export function useExecuteWorkflow() {
	const trpc = useTRPC();

	return useMutation(
		trpc.workflows.execute.mutationOptions({
			onSuccess: (data) => {
				toast.success(`Workflow "${data.name}" executed successfully.`);
			},
			onError: (error) => {
				toast.error(`Failed to execute workflow: ${error.message}.`);
			},
		})
	);
}
