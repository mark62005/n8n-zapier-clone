import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TSlackNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/slack";

import z from "zod";
import { slackNodeSettingsFormSchema } from "@/components/forms/nodes/messagers/SlackNodeSettingsForm";

export interface ISlackDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TSlackNodeSettingsFormValues>;
	onSubmit: (values: z.infer<typeof slackNodeSettingsFormSchema>) => void;
}
