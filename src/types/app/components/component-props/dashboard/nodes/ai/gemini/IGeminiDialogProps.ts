import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TGeminiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/gemini";

export interface IGeminiDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TGeminiNodeSettingsFormValues>;
	onSubmit: (values: TGeminiNodeSettingsFormValues) => void;
}
