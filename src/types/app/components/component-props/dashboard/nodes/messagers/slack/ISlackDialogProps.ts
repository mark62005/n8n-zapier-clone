import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TSlackNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/slack";

export interface ISlackDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TSlackNodeSettingsFormValues>;
	onSubmit: (values: TSlackNodeSettingsFormValues) => void;
}
