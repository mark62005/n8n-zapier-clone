"use server";

import { type TGoogleFormTriggerToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

export async function fetchGoogleFormTriggerRealtimeToken(): Promise<TGoogleFormTriggerToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: googleFormTriggerChannel(),
		topics: ["status"],
	});

	return token;
}
