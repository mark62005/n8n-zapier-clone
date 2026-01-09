import z from "zod";
import { credentialFormSchema } from "@/components/forms/dashboard/credentials/CredentialFormSchema";

export type TCredentialFormValues = z.infer<typeof credentialFormSchema>;
