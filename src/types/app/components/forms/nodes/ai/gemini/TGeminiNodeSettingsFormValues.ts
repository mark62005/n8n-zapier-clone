import z from "zod";
import { geminiNodeSettingsFormSchema } from "@/components/forms/dashboard/GeminiNodeSettingsForm";

export type TGeminiNodeSettingsFormValues = z.infer<
	typeof geminiNodeSettingsFormSchema
>;
