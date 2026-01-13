import { inngest } from "@/inngest/client";
import { createId } from "@paralleldrive/cuid2";

export async function sendWorkflowExecution(data: {
	workflowId: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}) {
	return inngest.send({
		name: "workflows/execute.workflow",
		data,
		id: createId(),
	});
}
