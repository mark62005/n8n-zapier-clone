import { type INodeDialogProps } from "../INodeDialogProps";
import { type THttpRequestNodeSettingsFormValues } from "@/types/app/components/forms/nodes/http-request";

import z from "zod";
import { httpRequestNodeSettingsFormSchema } from "@/components/forms/dashboard/HttpRequestNodeSettingsForm";

export interface IHttpRequestDialogProps extends INodeDialogProps {
	defaultValues?: Partial<THttpRequestNodeSettingsFormValues>;
	onSubmit: (values: z.infer<typeof httpRequestNodeSettingsFormSchema>) => void;
}
