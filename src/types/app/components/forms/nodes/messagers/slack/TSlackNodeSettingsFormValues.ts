import z from "zod";
import { slackNodeSettingsFormSchema } from "@/components/forms/nodes/messagers/SlackNodeSettingsForm";

export type TSlackNodeSettingsFormValues = z.infer<
	typeof slackNodeSettingsFormSchema
>;
