import { z } from "zod";

export const signUpFormSchema = z
	.object({
		name: z.string().min(1, "Name is required."),
		email: z.email("Please enter a valid email address."),
		password: z.string().min(8, "Password should be at least 8 characters."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password does not match. Please try again.",
		path: ["confirmPassword"],
	});

export type TSignUpFormValues = z.infer<typeof signUpFormSchema>;
