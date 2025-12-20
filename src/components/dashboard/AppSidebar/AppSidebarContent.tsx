"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_SIDEBAR_CONTENT_MENU_CONFIGS } from "@/lib/constants/configs/dashboard/app-sidebar/AppSidebarContentMenuConfigs";
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

function AppSidebarContent() {
	const pathname = usePathname();

	const isActiveLink = (targetHref: string) => {
		return targetHref === "/"
			? pathname === "/"
			: pathname.startsWith(`/${targetHref}`);
	};

	return (
		<SidebarContent>
			{APP_SIDEBAR_CONTENT_MENU_CONFIGS.map((group) => (
				<SidebarGroup key={group.title}>
					<SidebarGroupLabel className="capitalize">
						{group.title}
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{group.menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title}
										isActive={isActiveLink(item.href)}
										asChild
									>
										<Link
											href={`/${item.href}`}
											prefetch
										>
											<item.Icon className="size-4" />

											<span className="capitalize">{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			))}
		</SidebarContent>
	);
}
export default AppSidebarContent;
