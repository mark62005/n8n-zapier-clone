import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TOpenAiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/openai";

import z from "zod";
import { openAiNodeSettingsFormSchema } from "@/components/forms/dashboard/OpenAiNodeSettingsForm";

export interface IOpenAiDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TOpenAiNodeSettingsFormValues>;
	onSubmit: (values: z.infer<typeof openAiNodeSettingsFormSchema>) => void;
}
