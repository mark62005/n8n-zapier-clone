import { TRPCReactProvider } from "@/trpc/client";
import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";

function AppProviders({ children }: Readonly<IGeneralLayoutProps>) {
	return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
export default AppProviders;
