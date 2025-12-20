import { APP_SIDEBAR_MENU_BUTTON_CLASSNAME } from "@/lib/constants/configs/dashboard/app-sidebar/AppMenuButtonClassName";
import { cn } from "@/lib/utils";
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import AppLogo from "@/components/AppLogo";

function AppSidebarHeader() {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						className={cn(APP_SIDEBAR_MENU_BUTTON_CLASSNAME)}
						asChild
					>
						<AppLogo
							prefetch={true}
							textClassName="font-semibold text-sm"
						/>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}
export default AppSidebarHeader;
