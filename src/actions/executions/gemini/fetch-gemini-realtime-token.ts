"use server";

import { type TGeminiToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { geminiChannel } from "@/inngest/channels";

export async function fetchGeminiRealtimeToken(): Promise<TGeminiToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: geminiChannel(),
		topics: ["status"],
	});

	return token;
}
