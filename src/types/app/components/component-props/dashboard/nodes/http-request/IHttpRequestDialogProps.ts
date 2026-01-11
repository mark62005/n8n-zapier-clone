import { type INodeDialogProps } from "../INodeDialogProps";
import { type THttpRequestNodeSettingsFormValues } from "@/types/app/components/forms/nodes/http-request";

export interface IHttpRequestDialogProps extends INodeDialogProps {
	defaultValues?: Partial<THttpRequestNodeSettingsFormValues>;
	onSubmit: (values: THttpRequestNodeSettingsFormValues) => void;
}
