"use client";

import { Button } from "@/components/ui/button";
import { IEntityPaginationProps } from "@/types/app/components/component-props/dashboard/entities/IEntityPaginationProps";

function EntityPagination({
	page,
	totalNumberOfPages,
	onPageChange,
	disabled,
}: IEntityPaginationProps) {
	function handlePreviousClick() {
		onPageChange(Math.max(1, page - 1));
	}

	function handleNextClick() {
		onPageChange(Math.min(totalNumberOfPages, page + 1));
	}

	return (
		<div className="flex items-center justify-between gap-x-2 w-full">
			<div className="flex-1 text-sm text-muted-foreground">
				Page {page} of {totalNumberOfPages || 1}
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={handlePreviousClick}
					disabled={page === 1 || disabled}
				>
					Previous
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={handleNextClick}
					disabled={
						page === totalNumberOfPages || totalNumberOfPages === 0 || disabled
					}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
export default EntityPagination;
