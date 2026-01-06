"use server";

import { type THttpRequestToken } from "@/types/app/actions/executions/http-request";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { httpRequestChannel } from "@/inngest/channels/http-request";

export async function fetchHttpRequestRealtimeToken(): Promise<THttpRequestToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: httpRequestChannel(),
		topics: ["status"],
	});

	return token;
}
