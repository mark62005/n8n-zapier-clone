import z from "zod";

export const httpRequestNodeSettingsFormSchema = z.object({
	variableName: z
		.string()
		.min(1, { message: "Variable name is required" })
		.regex(/^[A-Za-z_$][A-Za-z0-_$]*$/, {
			message:
				"Variable name must start with a letter or underscore and contain only letters, numbers, or underscores.",
		}),
	endpoint: z.url({ message: "Please enter a valid URL." }),
	method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
	body: z
		.string()
		// .refine(), TODO
		.optional(),
});
