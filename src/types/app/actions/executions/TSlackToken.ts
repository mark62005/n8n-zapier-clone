import { type Realtime } from "@inngest/realtime";

import { slackChannel } from "@/inngest/channels";

export type TSlackToken = Realtime.Token<typeof slackChannel, ["status"]>;
