"use server";

import { type TOpenAiToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { openAiChannel } from "@/inngest/channels";

export async function fetchOpenAiRealtimeToken(): Promise<TOpenAiToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: openAiChannel(),
		topics: ["status"],
	});

	return token;
}
