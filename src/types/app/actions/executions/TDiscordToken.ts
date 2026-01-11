import { type Realtime } from "@inngest/realtime";

import { discordChannel } from "@/inngest/channels";

export type TDiscordToken = Realtime.Token<typeof discordChannel, ["status"]>;
