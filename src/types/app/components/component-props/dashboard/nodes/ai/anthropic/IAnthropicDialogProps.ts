import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TAnthropicNodeSettingsFormValues } from "@/types/app/components/forms/nodes/ai/anthropic";

export interface IAnthropicDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TAnthropicNodeSettingsFormValues>;
	onSubmit: (values: TAnthropicNodeSettingsFormValues) => void;
}
