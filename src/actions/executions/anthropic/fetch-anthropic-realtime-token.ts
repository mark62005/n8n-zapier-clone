"use server";

import { type TAnthropicToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { anthropicChannel } from "@/inngest/channels";

export async function fetchAnthropicRealtimeToken(): Promise<TAnthropicToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: anthropicChannel(),
		topics: ["status"],
	});

	return token;
}
