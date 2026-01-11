import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TDiscordNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/discord";

import z from "zod";
import { discordNodeSettingsFormSchema } from "@/components/forms/nodes/messagers/DiscordNodeSettingsForm";

export interface IDiscordDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TDiscordNodeSettingsFormValues>;
	onSubmit: (values: z.infer<typeof discordNodeSettingsFormSchema>) => void;
}
