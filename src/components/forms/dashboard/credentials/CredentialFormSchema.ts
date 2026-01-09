import { z } from "zod";
import { CredentialType } from "@/generated/prisma/enums";

export const credentialFormSchema = z.object({
	name: z.string().min(1, "Name is required."),
	type: z.enum(CredentialType),
	value: z.string().min(1, "API key is required."),
});
