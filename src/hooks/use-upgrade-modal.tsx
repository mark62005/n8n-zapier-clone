import { useState } from "react";
import { TRPCClientError } from "@trpc/client";
import UpgradeModal from "@/components/dashboard/UpgradeModal";

export function useUpgradeModal() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function handleError(error: unknown): boolean {
		if (error instanceof TRPCClientError) {
			if (error.data?.code === "FORBIDDEN") {
				setIsOpen(true);
				return true;
			}
		}

		return false;
	}

	const upgradeModal = (
		<UpgradeModal
			isOpen={isOpen}
			onOpenChange={setIsOpen}
		/>
	);

	return {
		handleError,
		upgradeModal,
	};
}
