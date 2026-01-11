import z from "zod";

export const slackNodeSettingsFormSchema = z.object({
	variableName: z
		.string()
		.min(1, { message: "Variable name is required." })
		.regex(/^[A-Za-z_$][A-Za-z0-_$]*$/, {
			message:
				"Variable name must start with a letter or underscore and contain only letters, numbers, or underscores.",
		}),
	content: z.string().min(1, "Message content is required."),
	webhookUrl: z.string().min(1, "Webhook URL is required."),
});
