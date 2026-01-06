"use server";

import { type TManualTriggerToken } from "@/types/app/actions/executions/manual-trigger";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

export async function fetchManualTriggerRealtimeToken(): Promise<TManualTriggerToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: manualTriggerChannel(),
		topics: ["status"],
	});

	return token;
}
