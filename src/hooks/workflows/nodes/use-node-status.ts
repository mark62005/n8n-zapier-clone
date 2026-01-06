import { type Realtime } from "@inngest/realtime";
import { type TNodeStatus } from "@/components/ui/react-flow/node-status-indicator";

import { useMemo } from "react";
import { useInngestSubscription } from "@inngest/realtime/hooks";

interface IUseNodeStatusOptions {
	nodeId: string;
	channel: string;
	topic: string;
	refreshToken: () => Promise<Realtime.Subscribe.Token>;
}

type TInngestSubscriptionData = ReturnType<
	typeof useInngestSubscription
>["data"];

type TInngestMessage = NonNullable<TInngestSubscriptionData>[number];

type TDataMessage = Extract<TInngestMessage, { kind: "data" }>;

export function useNodeStatus({
	nodeId,
	channel,
	topic,
	refreshToken,
}: IUseNodeStatusOptions): TNodeStatus {
	const { data: inngestSubscription } = useInngestSubscription({
		refreshToken,
		enabled: true,
	});

	const status = useMemo<TNodeStatus>(() => {
		if (!inngestSubscription?.length) {
			return "initial";
		}

		// Find the latest message for this node
		const latestMessage = inngestSubscription
			.filter(
				(msg) =>
					msg.kind === "data" &&
					msg.channel === channel &&
					msg.topic === topic &&
					msg.data.nodeId === nodeId
			)
			.reduce<TDataMessage | undefined>((latestMsg, currMsg) => {
				if (currMsg.kind !== "data") {
					return latestMsg;
				}

				if (
					!latestMsg ||
					currMsg.createdAt.getTime() > latestMsg.createdAt.getTime()
				) {
					return currMsg;
				}

				return latestMsg;
			}, undefined);

		return latestMessage?.kind === "data"
			? (latestMessage.data.status as TNodeStatus)
			: "initial";
	}, [inngestSubscription, channel, topic, nodeId]);

	return status;
}
