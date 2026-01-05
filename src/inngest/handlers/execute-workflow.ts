import { NonRetriableError } from "inngest";
import { inngest } from "../client";
import prisma from "@/lib/db/db";
import { topologicalSort } from "@/lib/utils/inngest/topological-sort";
import { getExecutor } from "@/lib/utils/workflows/executions/executor-registry";

export const executeWorkflow = inngest.createFunction(
	{ id: "execute-workflow" },
	{
		event: "workflows/execute.workflow",
	},
	async ({ event, step }) => {
		const workflowId = event.data.workflowId;

		if (!workflowId) {
			throw new NonRetriableError("Workflow ID is missing");
		}

		const sortedNodes = await step.run("prepare-workflow", async () => {
			const workflow = await prisma.workflow.findUniqueOrThrow({
				where: {
					id: workflowId,
				},
				include: {
					nodes: true,
					connections: true,
				},
			});

			if (!workflow) {
				throw new NonRetriableError("Workflow not found");
			}

			return topologicalSort(workflow.nodes, workflow.connections);
		});

		// Initialize context with any initial data from the trigger (eg. Google Form submission or web hook context)
		let context = event.data.initialData || {};

		// Execute each node
		for (const node of sortedNodes) {
			const executor = getExecutor(node.type);

			context = await executor({
				data: node.data as Record<string, unknown>,
				nodeId: node.id,
				context,
				step,
			});
		}

		return {
			workflowId,
			result: context,
		};
	}
);
