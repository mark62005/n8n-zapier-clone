import { type TExecutableNodeStatus } from "@/types/app/workflows/nodes";

import { channel, topic } from "@inngest/realtime";

export const SLACK_CHANNEL_NAME = "slack-execution";

export const slackChannel = channel(SLACK_CHANNEL_NAME).addTopic(
	topic("status").type<{
		nodeId: string;
		status: TExecutableNodeStatus;
	}>()
);
