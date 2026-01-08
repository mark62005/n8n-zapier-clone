import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TGeminiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/gemini";

import z from "zod";
import { geminiNodeSettingsFormSchema } from "@/components/forms/dashboard/GeminiNodeSettingsForm";

export interface IGeminiDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TGeminiNodeSettingsFormValues>;
	onSubmit: (values: z.infer<typeof geminiNodeSettingsFormSchema>) => void;
}
