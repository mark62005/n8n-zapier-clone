import { IStateViewProps } from "./IStateViewProps";

export interface IEmptyViewProps extends IStateViewProps {
	titleLabel: string;
	onNew?: () => void;
	addNewButtonLabel?: string;
}
