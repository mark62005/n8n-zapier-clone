import { IStateViewProps } from "@/types/app/components/component-props/dashboard/entities/state-views/IStateViewProps";
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";

function StateView({ message, variant }: IStateViewProps) {
	return (
		<div className="h-full flex flex-col justify-center items-center flex-1 gap-y-4">
			{variant === "loading" ? (
				<Loader2Icon className="size-6 animate-spin text-primary" />
			) : (
				<AlertTriangleIcon className="size-6 text-primary" />
			)}

			{Boolean(message) && (
				<p className="text-sm text-muted-foreground">{message}</p>
			)}
		</div>
	);
}
export default StateView;
