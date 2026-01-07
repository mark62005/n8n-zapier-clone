"use server";

import { type THttpRequestToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { httpRequestChannel } from "@/inngest/channels";

export async function fetchHttpRequestRealtimeToken(): Promise<THttpRequestToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: httpRequestChannel(),
		topics: ["status"],
	});

	return token;
}
