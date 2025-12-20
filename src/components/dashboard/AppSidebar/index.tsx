import { Sidebar } from "@/components/ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import AppSidebarContent from "./AppSidebarContent";
import AppSidebarFooter from "./AppSidebarFooter";

function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<AppSidebarHeader />
			<AppSidebarContent />
			<AppSidebarFooter />
		</Sidebar>
	);
}
export default AppSidebar;
