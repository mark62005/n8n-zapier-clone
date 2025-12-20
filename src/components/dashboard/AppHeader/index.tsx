import { SidebarTrigger } from "@/components/ui/sidebar";

function AppHeader() {
	return (
		<header className="flex items-center gap-2 shrink-0 h-14 px-4 bg-background border-b">
			<SidebarTrigger />
		</header>
	);
}
export default AppHeader;
