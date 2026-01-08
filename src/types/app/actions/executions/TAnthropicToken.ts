import { type Realtime } from "@inngest/realtime";

import { anthropicChannel } from "@/inngest/channels";

export type TAnthropicToken = Realtime.Token<
	typeof anthropicChannel,
	["status"]
>;
