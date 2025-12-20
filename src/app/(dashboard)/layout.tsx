import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";
import { SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/AppSidebar";

function DashboardPagesLayout({ children }: IGeneralLayoutProps) {
	return (
		<>
			<AppSidebar />

			<SidebarInset className="bg-accent/20">{children}</SidebarInset>
		</>
	);
}
export default DashboardPagesLayout;
