import { SidebarTrigger } from "@/components/ui/sidebar";
import { APP_HEADER_CLASSNAME } from "@/lib/constants/configs/dashboard/app-header";

function AppHeader() {
	return (
		<header className={APP_HEADER_CLASSNAME}>
			<SidebarTrigger />
		</header>
	);
}
export default AppHeader;
