import { TAppSidebarFooterMenuConfigs } from "@/types/app/configs/dashboard/app-sidebar/TAppSidebarFooterMenuConfigs";
import { CreditCardIcon, LogOutIcon, StarIcon } from "lucide-react";

export const APP_SIDEBAR_FOOTER_MENU_CONFIGS: TAppSidebarFooterMenuConfigs = [
	{
		title: "Upgrade to Pro",
		Icon: StarIcon,
		href: "#",
	},
	{
		title: "Billings",
		Icon: CreditCardIcon,
		href: "#",
	},
	{
		title: "Sign Out",
		Icon: LogOutIcon,
		href: "#",
	},
];
