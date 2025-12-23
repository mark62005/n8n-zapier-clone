import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

export function useCreateWorkflow() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	return useMutation(
		trpc.workflows.createWorkflow.mutationOptions({
			onSuccess: (data) => {
				toast.success(`Workflow "${data.name}" created successfully.`);

				router.push(`/workflows/${data.id}`);

				queryClient.invalidateQueries(
					trpc.workflows.getAllWorkflowsOfAUser.queryOptions()
				);
			},
			onError: (error) => {
				toast.error(`Failed to create workflow: ${error.message}.`);
			},
		})
	);
}
