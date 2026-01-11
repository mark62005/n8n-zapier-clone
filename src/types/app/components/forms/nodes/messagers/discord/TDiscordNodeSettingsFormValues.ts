import z from "zod";
import { discordNodeSettingsFormSchema } from "@/components/forms/nodes/messagers/DiscordNodeSettingsForm";

export type TDiscordNodeSettingsFormValues = z.infer<
	typeof discordNodeSettingsFormSchema
>;
