"use client";

import { Button } from "@/components/ui/button";
import { TEntityHeaderProps } from "@/types/app/components/component-props/dashboard/entities/TEntityHeaderProps";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

function EntityHeader({
	title,
	description,
	handleNewButtonClick,
	newButtonHref,
	newButtonLabel,
	disabled,
	isCreating,
}: TEntityHeaderProps) {
	return (
		<div className="flex flex-row items-center justify-between gap-x-4">
			<div className="flex flex-col">
				<h1 className="text-lg md:text-xl font-semibold">{title}</h1>

				{description && (
					<p className="text-xs md:text-sm text-muted-foreground">
						{description}
					</p>
				)}
			</div>

			{handleNewButtonClick && !newButtonHref && (
				<Button
					disabled={isCreating || disabled}
					size="sm"
					onClick={handleNewButtonClick}
				>
					<PlusIcon className="size-4" />
					{newButtonLabel}
				</Button>
			)}

			{newButtonHref && !handleNewButtonClick && (
				<Button
					size="sm"
					asChild
				>
					<Link
						href={newButtonHref}
						prefetch
					>
						<PlusIcon className="size-4" />
						{newButtonLabel}
					</Link>
				</Button>
			)}
		</div>
	);
}
export default EntityHeader;
