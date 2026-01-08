import z from "zod";
import { openAiNodeSettingsFormSchema } from "@/components/forms/dashboard/OpenAiNodeSettingsForm";

export type TOpenAiNodeSettingsFormValues = z.infer<
	typeof openAiNodeSettingsFormSchema
>;
