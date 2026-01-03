import type { INodeDialogProps } from "./INodeDialogProps";

import z from "zod";
import { httpRequestNodeSettingsFormSchema } from "@/components/forms/dashboard/HttpRequestNodeSettingsForm/schema";
import { THttpRequestNodeSettingsFormValues } from "@/types/app/components/forms/nodes/http-request/THttpRequestNodeSettingsForm";

export interface IHttpRequestDialogProps extends INodeDialogProps {
	defaultValues?: Partial<THttpRequestNodeSettingsFormValues>;
	onSubmit: (values: z.infer<typeof httpRequestNodeSettingsFormSchema>) => void;
}
