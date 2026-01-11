import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TOpenAiNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/openai";

export interface IOpenAiDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TOpenAiNodeSettingsFormValues>;
	onSubmit: (values: TOpenAiNodeSettingsFormValues) => void;
}
