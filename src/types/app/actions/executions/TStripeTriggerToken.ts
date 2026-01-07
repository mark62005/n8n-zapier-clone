import { type Realtime } from "@inngest/realtime";

import { stripeTriggerChannel } from "@/inngest/channels";

export type TStripeTriggerToken = Realtime.Token<
	typeof stripeTriggerChannel,
	["status"]
>;
