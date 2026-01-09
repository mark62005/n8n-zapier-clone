import { type IGeneralLayoutProps } from "@/types/app/layout-props/GeneralLayoutProps";

function CredentialFormViewsLayout({ children }: IGeneralLayoutProps) {
	return (
		<div className="h-full p-4 md:px-10 md:py-6">
			<div className="flex flex-col w-full max-w-3xl h-full mx-auto gap-y-8">
				{children}
			</div>
		</div>
	);
}
export default CredentialFormViewsLayout;
