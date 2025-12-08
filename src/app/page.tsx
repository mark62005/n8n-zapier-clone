"use client";

import SignOutButton from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Home() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const { data: workflows } = useQuery(
		trpc.workflows.getAllWorkflows.queryOptions()
	);
	const createWorkflow = useMutation(
		trpc.workflows.createWorkflow.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.workflows.getAllWorkflows.queryOptions()
				);
			},
		})
	);

	const testAi = useMutation(
		trpc.testings.testAi.mutationOptions({
			onSuccess: () => {
				toast.success("AI Job queued.");
			},
		})
	);

	return (
		<div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-y-6">
			<div>{JSON.stringify(workflows, null, 2)}</div>

			<Button
				onClick={() => testAi.mutate()}
				disabled={testAi.isPending}
			>
				Test AI
			</Button>

			<Button
				onClick={() => createWorkflow.mutate()}
				disabled={createWorkflow.isPending}
			>
				Create workflow
			</Button>

			<SignOutButton />
		</div>
	);
}
