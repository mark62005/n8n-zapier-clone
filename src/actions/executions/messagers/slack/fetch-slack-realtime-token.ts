"use server";

import { type TSlackToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { slackChannel } from "@/inngest/channels";

export async function fetchSlackRealtimeToken(): Promise<TSlackToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: slackChannel(),
		topics: ["status"],
	});

	return token;
}
