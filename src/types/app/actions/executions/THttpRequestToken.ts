import { type Realtime } from "@inngest/realtime";

import { httpRequestChannel } from "@/inngest/channels";

export type THttpRequestToken = Realtime.Token<
	typeof httpRequestChannel,
	["status"]
>;
