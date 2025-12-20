"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { APP_SIDEBAR_FOOTER_MENU_CONFIGS } from "@/lib/constants/configs/dashboard/app-sidebar/AppSidebarFooterMenuConfig";
import { APP_SIDEBAR_MENU_BUTTON_CLASSNAME } from "@/lib/constants/configs/dashboard/app-sidebar/AppMenuButtonClassName";
import { cn } from "@/lib/utils";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

function AppSidebarFooter() {
	const router = useRouter();

	function handleSignOut() {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
				},
			},
		});
	}

	return (
		<SidebarFooter>
			<SidebarMenu>
				{APP_SIDEBAR_FOOTER_MENU_CONFIGS.map((footerItem) => {
					const { title, Icon } = footerItem;

					if (title === "Sign Out") {
						return (
							<SidebarMenuItem key={title}>
								<SidebarMenuButton
									tooltip={title}
									className={cn(
										"capitalize",
										APP_SIDEBAR_MENU_BUTTON_CLASSNAME
									)}
									onClick={handleSignOut}
								>
									<Icon className="size-4" />

									<span className="">{title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					}

					return (
						<SidebarMenuItem key={title}>
							<SidebarMenuButton
								tooltip={title}
								className={cn("capitalize", APP_SIDEBAR_MENU_BUTTON_CLASSNAME)}
							>
								<Icon className="size-4" />

								<span className="">{title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarFooter>
	);
}
export default AppSidebarFooter;
