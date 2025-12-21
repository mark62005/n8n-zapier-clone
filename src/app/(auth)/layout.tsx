import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";
import AppLogo from "@/components/AppLogo";

function AuthLayout({ children }: IGeneralLayoutProps) {
	return (
		<div className="min-h-svh flex flex-col justify-center items-center gap-6 p-6 md:p-10 bg-muted">
			<div className="w-full max-w-sm flex flex-col gap-6">
				<AppLogo className="flex items-center gap-2 self-center font-medium hover:opacity-80" />

				{children}
			</div>
		</div>
	);
}
export default AuthLayout;
