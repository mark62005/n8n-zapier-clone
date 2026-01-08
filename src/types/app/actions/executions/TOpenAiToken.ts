import { type Realtime } from "@inngest/realtime";

import { openAiChannel } from "@/inngest/channels";

export type TOpenAiToken = Realtime.Token<typeof openAiChannel, ["status"]>;
