import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TAnthropicNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/anthropic";

import z from "zod";
import { anthropicNodeSettingsFormSchema } from "@/components/forms/dashboard/AnthropicNodeSettingsForm";

export interface IAnthropicDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TAnthropicNodeSettingsFormValues>;
	onSubmit: (values: z.infer<typeof anthropicNodeSettingsFormSchema>) => void;
}
