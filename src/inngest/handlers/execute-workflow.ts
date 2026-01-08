import { NonRetriableError } from "inngest";
import { inngest } from "../client";
import prisma from "@/lib/db/db";
import { topologicalSort } from "@/lib/utils/inngest/topological-sort";
import { getExecutor } from "@/lib/utils/workflows/executions/executor-registry";

import {
	httpRequestChannel,
	geminiChannel,
	openAiChannel,
	anthropicChannel,
	stripeTriggerChannel,
} from "@/inngest/channels";
import { manualTriggerChannel } from "../channels/manual-trigger";
import { googleFormTriggerChannel } from "../channels/google-form-trigger";

export const executeWorkflow = inngest.createFunction(
	{
		id: "execute-workflow",
		retries: 0, // TODO: Remove in production
	},
	{
		event: "workflows/execute.workflow",
		channels: [
			httpRequestChannel(),
			/* AI NODES */
			geminiChannel(),
			openAiChannel(),
			anthropicChannel(),
			/* TRIGGER NODES */
			manualTriggerChannel(),
			googleFormTriggerChannel(),
			stripeTriggerChannel(),
		],
	},
	async ({ event, step, publish }) => {
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
				publish,
			});
		}

		return {
			workflowId,
			result: context,
		};
	}
);
