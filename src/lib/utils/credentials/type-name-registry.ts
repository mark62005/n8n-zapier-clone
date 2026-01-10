import { CredentialType } from "@/generated/prisma/enums";

type TTypeNameRegistry = Record<CredentialType, string>;

export const typeNameRegistry: TTypeNameRegistry = {
	[CredentialType.GEMINI]: "Gemini",
	[CredentialType.OPENAI]: "OpenAI",
	[CredentialType.ANTHROPIC]: "Anthropic",
};

export function getCredentialTypeNameOrThrow(type: CredentialType): string {
	const name = typeNameRegistry[type];

	if (!name) {
		throw new Error(`No name found for this credential type: ${type}.`);
	}

	return name;
}
