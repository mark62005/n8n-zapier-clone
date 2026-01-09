import { type CredentialType as TCredentialType } from "@/generated/prisma/enums";

export interface ICredentialFormProps {
	initialData?: {
		id?: string;
		name: string;
		value: string;
		type: TCredentialType;
	};
}
