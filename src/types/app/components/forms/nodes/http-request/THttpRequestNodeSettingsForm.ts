import z from "zod";
import { httpRequestNodeSettingsFormSchema } from "@/components/forms/dashboard/HttpRequestNodeSettingsForm/schema";

export type THttpRequestNodeSettingsForm = z.infer<
	typeof httpRequestNodeSettingsFormSchema
>;
