import z from "zod";

export const httpRequestNodeSettingsFormSchema = z.object({
	endpoint: z.url({ message: "Please enter a valid URL." }),
	method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
	body: z
		.string()
		// .refine(), TODO
		.optional(),
});
