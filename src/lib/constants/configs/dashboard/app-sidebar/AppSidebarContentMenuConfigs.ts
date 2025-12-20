import { FolderOpenIcon, HistoryIcon, KeyIcon } from "lucide-react";
import { TAppSidebarContentMenuConfigs } from "@/types/app/configs/dashboard/app-sidebar/TAppSidebarContentMenuConfigs";

export const APP_SIDEBAR_CONTENT_MENU_CONFIGS: TAppSidebarContentMenuConfigs = [
	{
		title: "Main",
		menuItems: [
			{
				title: "Workflows",
				Icon: FolderOpenIcon,
				href: "workflows",
			},
			{
				title: "Credentials",
				Icon: KeyIcon,
				href: "credentials",
			},
			{
				title: "Executions",
				Icon: HistoryIcon,
				href: "executions",
			},
		],
	},
];
