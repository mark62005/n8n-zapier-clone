import z from "zod";

export const geminiNodeSettingsFormSchema = z.object({
	variableName: z
		.string()
		.min(1, { message: "Variable name is required." })
		.regex(/^[A-Za-z_$][A-Za-z0-_$]*$/, {
			message:
				"Variable name must start with a letter or underscore and contain only letters, numbers, or underscores.",
		}),
	systemPrompt: z.string().optional(),
	userPrompt: z.string().min(1, { message: "User prompt is required." }),
});
