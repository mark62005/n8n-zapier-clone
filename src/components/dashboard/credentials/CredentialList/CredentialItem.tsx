"use client";

import { type ICredentialItemProps } from "@/types/app/components/component-props/dashboard/credentials/credential-list";

import { formatDistanceToNow } from "date-fns";
import { useDeleteCredential } from "@/hooks/use-credentials";

import { WorkflowIcon } from "lucide-react";
import EntityItem from "../../entities/EntityItem";

function CredentialItem({ data }: ICredentialItemProps) {
	const { id, name } = data;

	const deleteCredential = useDeleteCredential();

	const updatedTimeAgo = formatDistanceToNow(data.updatedAt, {
		addSuffix: true,
	});
	const createdTimeAgo = formatDistanceToNow(data.createdAt, {
		addSuffix: true,
	});

	function handleDeleteCredential() {
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
				// TODO: Dynamically render different icons
				<div className="size-8 flex items-center justify-center">
					<WorkflowIcon className="size-5 text-muted-foreground" />
				</div>
			}
			onRemove={handleDeleteCredential}
			isRemoving={deleteCredential.isPending}
		/>
	);
}
export default CredentialItem;
