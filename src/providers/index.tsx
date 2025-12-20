import { SidebarProvider } from "@/components/ui/sidebar";
import { TRPCReactProvider } from "@/trpc/client";
import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";

function AppProviders({ children }: Readonly<IGeneralLayoutProps>) {
	return (
		<TRPCReactProvider>
			<SidebarProvider>{children}</SidebarProvider>
		</TRPCReactProvider>
	);
}
export default AppProviders;
