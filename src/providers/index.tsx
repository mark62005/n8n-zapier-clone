import { SidebarProvider } from "@/components/ui/sidebar";
import { TRPCReactProvider } from "@/trpc/client";
import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";
import { Provider as JotaiProvider } from "jotai";

function AppProviders({ children }: Readonly<IGeneralLayoutProps>) {
	return (
		<TRPCReactProvider>
			<SidebarProvider>
				<JotaiProvider>{children}</JotaiProvider>
			</SidebarProvider>
		</TRPCReactProvider>
	);
}
export default AppProviders;
