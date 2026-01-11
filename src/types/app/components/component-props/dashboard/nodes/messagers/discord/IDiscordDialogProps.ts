import { type INodeDialogProps } from "../../INodeDialogProps";
import { type TDiscordNodeSettingsFormValues } from "@/types/app/components/forms/nodes/messagers/discord";

export interface IDiscordDialogProps extends INodeDialogProps {
	defaultValues?: Partial<TDiscordNodeSettingsFormValues>;
	onSubmit: (values: TDiscordNodeSettingsFormValues) => void;
}
