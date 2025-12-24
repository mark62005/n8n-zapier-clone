import { IEntityContainerProps } from "@/types/app/components/component-props/dashboard/entities/IEntityContainerProps";

function EntityContainer({
	children,
	header,
	search,
	pagination,
}: IEntityContainerProps) {
	return (
		<div className="h-full p-4 md:px-10 md:py-6">
			<div className="h-full w-full max-w-7xl flex flex-col gap-y-8 mx-auto">
				{header}

				<div className="flex flex-col gap-y-4 h-full">
					{search}
					{children}
				</div>

				{pagination}
			</div>
		</div>
	);
}
export default EntityContainer;
