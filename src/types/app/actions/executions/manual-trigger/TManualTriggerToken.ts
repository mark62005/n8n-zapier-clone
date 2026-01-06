import { type Realtime } from "@inngest/realtime";

import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

export type TManualTriggerToken = Realtime.Token<
	typeof manualTriggerChannel,
	["status"]
>;
