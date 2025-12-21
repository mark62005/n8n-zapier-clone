import Image from "next/image";
import Link from "next/link";
import { IAppLogoProps } from "@/types/app/components/component-props/app-logo/IAppLogoProps";
import { cn } from "@/lib/utils";

function AppLogo({
	className,
	prefetch = false,
	textClassName,
}: IAppLogoProps) {
	return (
		<Link
			href="/"
			className={cn(className)}
			prefetch={prefetch}
		>
			<Image
				src="/logos/logo.svg"
				alt="Logo of n8n Zapier Clone"
				width={30}
				height={30}
			/>

			<h1 className={cn(textClassName)}>n8n Zapier Clone</h1>
		</Link>
	);
}
export default AppLogo;
