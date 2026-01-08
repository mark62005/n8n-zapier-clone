import z from "zod";
import { anthropicNodeSettingsFormSchema } from "@/components/forms/dashboard/AnthropicNodeSettingsForm";

export type TAnthropicNodeSettingsFormValues = z.infer<
	typeof anthropicNodeSettingsFormSchema
>;
