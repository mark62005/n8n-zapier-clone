export type TEntityHeaderProps = {
	title: string;
	description?: string;
	newButtonLabel?: string;
	disabled?: boolean;
	isCreating?: boolean;
} & (
	| { handleNewButtonClick: () => void; newButtonHref?: never }
	| { newButtonHref: string; handleNewButtonClick?: never }
	| { handleNewButtonClick?: never; newButtonHref?: never }
);
