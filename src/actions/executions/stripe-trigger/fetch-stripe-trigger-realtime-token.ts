"use server";

import { type TStripeTriggerToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { stripeTriggerChannel } from "@/inngest/channels";

export async function fetchStripeTriggerRealtimeToken(): Promise<TStripeTriggerToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: stripeTriggerChannel(),
		topics: ["status"],
	});

	return token;
}
