import z from "zod";

export const anthropicNodeSettingsFormSchema = z.object({
	variableName: z
		.string()
		.min(1, { message: "Variable name is required." })
		.regex(/^[A-Za-z_$][A-Za-z0-_$]*$/, {
			message:
				"Variable name must start with a letter or underscore and contain only letters, numbers, or underscores.",
		}),
	credentialId: z.string().min(1, "Credential is required."),
	systemPrompt: z.string().optional(),
	userPrompt: z.string().min(1, { message: "User prompt is required." }),
});
