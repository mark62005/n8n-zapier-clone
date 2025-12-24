export interface IEntityPaginationProps {
	page: number;
	totalNumberOfPages: number;
	onPageChange: (page: number) => void;
	disabled?: boolean;
}
