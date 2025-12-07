import { z } from "zod";

export const signInFormSchema = z.object({
	email: z.email("Please enter a valid email address."),
	password: z.string().min(8, "Password should be at least 8 characters."),
});

export type TSignInFormValues = z.infer<typeof signInFormSchema>;
