"use client";

import { type ICredentialItemProps } from "@/types/app/components/component-props/dashboard/credentials/credential-list";

import { CredentialType } from "@/generated/prisma/enums";

import { formatDistanceToNow } from "date-fns";
import { useDeleteCredential } from "@/hooks/use-credentials";

import Image from "next/image";
import EntityItem from "../../entities/EntityItem";

const CREDENTIAL_LOGOS_CONFIG: Record<CredentialType, string> = {
	[CredentialType.GEMINI]: "/logos/gemini.svg",
	[CredentialType.OPENAI]: "/logos/openai.svg",
	[CredentialType.ANTHROPIC]: "/logos/anthropic.svg",
};

function CredentialItem({ data }: ICredentialItemProps) {
	const { id, name, credentialType } = data;

	const deleteCredential = useDeleteCredential();

	const updatedTimeAgo = formatDistanceToNow(data.updatedAt, {
		addSuffix: true,
	});
	const createdTimeAgo = formatDistanceToNow(data.createdAt, {
		addSuffix: true,
	});

	const logoSrc =
		CREDENTIAL_LOGOS_CONFIG[credentialType] || "/logos/openai.svg";

	function handleDeleteCredential() {
		if (deleteCredential.isPending) return;

		deleteCredential.mutate({
			id,
		});
	}

	return (
		<EntityItem
			href={`/credentials/${id}`}
			title={name}
			subtitle={
				<>
					Updated {updatedTimeAgo} &bull; Created {createdTimeAgo}
				</>
			}
			image={
				<div className="size-8 flex items-center justify-center">
					<Image
						src={logoSrc}
						alt={`Logo of ${credentialType}`}
						width={20}
						height={20}
					/>
				</div>
			}
			onRemove={handleDeleteCredential}
			isRemoving={deleteCredential.isPending}
		/>
	);
}
export default CredentialItem;
