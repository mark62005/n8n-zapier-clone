import { IEmptyViewProps } from "@/types/app/components/component-props/dashboard/entities/state-views/IEmptyViewProps";
import { PackageOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

function EmptyView({
	message,
	onNew,
	titleLabel,
	addNewButtonLabel,
}: IEmptyViewProps) {
	return (
		<Empty className="border border-dashed bg-white">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<PackageOpenIcon />
				</EmptyMedia>
			</EmptyHeader>

			<EmptyTitle>{titleLabel}</EmptyTitle>

			{!!message && <EmptyDescription>{message}</EmptyDescription>}

			{!!onNew && (
				<EmptyContent>
					<Button onClick={onNew}>{addNewButtonLabel}</Button>
				</EmptyContent>
			)}
		</Empty>
	);
}
export default EmptyView;
