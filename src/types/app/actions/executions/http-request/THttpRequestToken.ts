import { type Realtime } from "@inngest/realtime";

import { httpRequestChannel } from "@/inngest/channels/http-request";

export type THttpRequestToken = Realtime.Token<
	typeof httpRequestChannel,
	["status"]
>;
