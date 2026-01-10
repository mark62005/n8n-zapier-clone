import z from "zod";

export const discordNodeSettingsFormSchema = z.object({
	variableName: z
		.string()
		.min(1, { message: "Variable name is required." })
		.regex(/^[A-Za-z_$][A-Za-z0-_$]*$/, {
			message:
				"Variable name must start with a letter or underscore and contain only letters, numbers, or underscores.",
		}),
	username: z.string().optional(),
	content: z
		.string()
		.min(1, "Message content is required.")
		.max(2000, "Discord messages cannot exceed 2000 characters."),
	webhookUrl: z.string().min(1, "Webhook URL is required."),
});
