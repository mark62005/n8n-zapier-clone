import { type Realtime } from "@inngest/realtime";

import { geminiChannel } from "@/inngest/channels";

export type TGeminiToken = Realtime.Token<typeof geminiChannel, ["status"]>;
