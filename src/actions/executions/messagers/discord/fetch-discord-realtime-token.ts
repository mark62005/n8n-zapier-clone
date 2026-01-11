"use server";

import { type TDiscordToken } from "@/types/app/actions/executions";

import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { discordChannel } from "@/inngest/channels";

export async function fetchDiscordRealtimeToken(): Promise<TDiscordToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: discordChannel(),
		topics: ["status"],
	});

	return token;
}
