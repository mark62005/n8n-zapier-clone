"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import { IEntityItemProps } from "@/types/app/components/component-props/dashboard/entities/IEntityItemProps";
import { cn } from "@/lib/utils";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function EntityItem({
	href,
	title,
	subtitle,
	image,
	actions,
	onRemove,
	isRemoving,
	className,
}: IEntityItemProps) {
	async function handleRemove(e: MouseEvent): Promise<void> {
		e.preventDefault();
		e.stopPropagation();

		if (isRemoving) {
			return;
		}

		if (onRemove) {
			await onRemove();
		}
	}

	return (
		<Link
			href={href}
			prefetch
		>
			<Card
				className={cn(
					"p-4 shadow-none hover:shadow cursor-pointer",
					isRemoving && "opacity-50 cursor-not-allowed",
					className
				)}
			>
				<CardContent className="flex flex-row items-center justify-between p-0">
					<div className="flex items-center gap-3">
						{image}

						<div>
							<CardTitle className="text-base font-medium">{title}</CardTitle>

							{!!subtitle && (
								<CardDescription className="text-xs">
									{subtitle}
								</CardDescription>
							)}
						</div>
					</div>

					{(actions || onRemove) && (
						<div className="flex items-center gap-x-4">
							{actions}

							{onRemove && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											size="icon"
											variant="ghost"
											onClick={(e) => e.stopPropagation()}
										>
											<MoreVerticalIcon className="size-4" />
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent
										align="end"
										onClick={(e) => e.stopPropagation()}
									>
										<DropdownMenuItem
											onClick={handleRemove}
											className="cursor-pointer"
										>
											<TrashIcon className="size-4" />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</Link>
	);
}
export default EntityItem;
