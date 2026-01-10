import {
	type CredentialType,
	type Credential as TCredential,
} from "@/generated/prisma/client";

import { NonRetriableError } from "inngest";
import prisma from "@/lib/db/db";
import { getCredentialTypeNameOrThrow } from "./type-name-registry";

export async function getRequiredCredential(
	credentialId: string,
	userId: string,
	type: CredentialType
): Promise<TCredential> {
	const nodeName = getCredentialTypeNameOrThrow(type);

	if (!credentialId) {
		throw new NonRetriableError(`${nodeName} node: Credential ID is required.`);
	}

	const credential = await prisma.credential.findUnique({
		where: { id: credentialId, userId },
	});

	if (!credential) {
		throw new NonRetriableError(`${nodeName} node: Credential not found.`);
	}

	return credential;
}
