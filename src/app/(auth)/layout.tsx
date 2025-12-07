import { IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";
import Image from "next/image";
import Link from "next/link";

function AuthLayout({ children }: IGeneralLayoutProps) {
	return (
		<div className="min-h-svh flex flex-col justify-center items-center gap-6 p-6 md:p-10 bg-muted">
			<div className="w-full max-w-sm flex flex-col gap-6">
				<Link
					href="/"
					className="flex items-center gap-2 self-center font-medium hover:opacity-80"
				>
					<Image
						src="/logos/logo.svg"
						alt="Logo of n8n Zapier Clone"
						width={30}
						height={30}
					/>
					n8n Zapier Clone
				</Link>

				{children}
			</div>
		</div>
	);
}
export default AuthLayout;
