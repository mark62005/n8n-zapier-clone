import type { SearchParams } from "nuqs/server";

export interface IWorkflowsPageProps {
	searchParams: Promise<SearchParams>;
}
