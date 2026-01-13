import { ExecutionStatus } from "@/generated/prisma/enums";

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
	discordChannel,
	slackChannel,
} from "@/inngest/channels";
import { manualTriggerChannel } from "../channels/manual-trigger";
import { googleFormTriggerChannel } from "../channels/google-form-trigger";

export const executeWorkflow = inngest.createFunction(
	{
		id: "execute-workflow",
		retries: 0, // TODO: Remove in production
		onFailure: async ({ event }) => {
			return prisma.execution.update({
				where: { inngestEventId: event.data.event.id },
				data: {
					status: ExecutionStatus.FAILED,
					error: event.data.error.message,
					errorStack: event.data.error.stack,
				},
			});
		},
	},
	{
		event: "workflows/execute.workflow",
		channels: [
			httpRequestChannel(),

			/* AI NODES */
			geminiChannel(),
			openAiChannel(),
			anthropicChannel(),
			/* MESSAGER NODES */
			discordChannel(),
			slackChannel(),

			/* TRIGGER NODES */
			manualTriggerChannel(),
			googleFormTriggerChannel(),
			stripeTriggerChannel(),
		],
	},
	async ({ event, step, publish }) => {
		const inngestEventId = event.id;
		const workflowId = event.data.workflowId;

		if (!inngestEventId) {
			throw new NonRetriableError("Event ID is missing");
		}
		if (!workflowId) {
			throw new NonRetriableError("Workflow ID is missing");
		}

		await step.run("initiate-execution-history", async () => {
			return prisma.execution.create({
				data: {
					workflowId,
					inngestEventId,
				},
			});
		});

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

		// Retrieve auth user's ID
		const userId = await step.run("find-user-id", async () => {
			const workflow = await prisma.workflow.findUniqueOrThrow({
				where: {
					id: workflowId,
				},
				select: {
					userId: true,
				},
			});

			return workflow.userId;
		});

		// Initialize context with any initial data from the trigger (eg. Google Form submission or web hook context)
		let context = event.data.initialData || {};

		// Execute each node
		for (const node of sortedNodes) {
			const executor = getExecutor(node.type);

			context = await executor({
				data: node.data as Record<string, unknown>,
				nodeId: node.id,
				userId,
				context,
				step,
				publish,
			});
		}

		await step.run("update-execution-status", async () => {
			return await prisma.execution.update({
				where: { inngestEventId, workflowId },
				data: {
					status: ExecutionStatus.SUCCESS,
					completedAt: new Date(),
					output: context,
				},
			});
		});

		return {
			workflowId,
			result: context,
		};
	}
);
