import type { INodeDialogProps } from "./INodeDialogProps";

import z from "zod";
import { httpRequestNodeSettingsFormSchema } from "@/components/forms/dashboard/HttpRequestNodeSettingsForm/schema";

export interface IHttpRequestDialogProps extends INodeDialogProps {
	defaultEndpoint?: string;
	defaultMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	defaultBody?: string;
	onSubmit: (values: z.infer<typeof httpRequestNodeSettingsFormSchema>) => void;
}
