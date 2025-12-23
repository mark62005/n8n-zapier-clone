"use client";

import { authClient } from "@/lib/auth/auth-client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IUpgradeModalProps } from "@/types/app/components/component-props/dashboard/IUpgradeModalProps";

function UpgradeModal({ isOpen, onOpenChange }: IUpgradeModalProps) {
	function handleUpgradeNowClick() {
		authClient.checkout({ slug: "pro" });
	}

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<AlertDialogContent>
				{/* HEADER */}
				<AlertDialogHeader>
					<AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>

					<AlertDialogDescription>
						You need an active subscription to perform this action. Update to
						Pro to unlock all features.
					</AlertDialogDescription>
				</AlertDialogHeader>

				{/* FOOTER */}
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<AlertDialogAction onClick={handleUpgradeNowClick}>
						Upgrade Now
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
export default UpgradeModal;
