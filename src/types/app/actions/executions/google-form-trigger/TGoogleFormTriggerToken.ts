import { type Realtime } from "@inngest/realtime";

import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

export type TGoogleFormTriggerToken = Realtime.Token<
	typeof googleFormTriggerChannel,
	["status"]
>;
