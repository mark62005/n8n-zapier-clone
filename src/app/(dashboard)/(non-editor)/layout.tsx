import AppHeader from "@/components/dashboard/AppHeader";
import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";

function NonEditorPagesLayout({ children }: IGeneralLayoutProps) {
	return (
		<>
			<AppHeader />

			<main className="flex-1">{children}</main>
		</>
	);
}
export default NonEditorPagesLayout;
