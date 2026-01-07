import z from "zod";
import { httpRequestNodeSettingsFormSchema } from "@/components/forms/dashboard/HttpRequestNodeSettingsForm";

export type THttpRequestNodeSettingsFormValues = z.infer<
	typeof httpRequestNodeSettingsFormSchema
>;
