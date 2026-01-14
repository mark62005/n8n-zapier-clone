import type { SearchParams } from "nuqs/server";

export interface IExecutionsPageProps {
	searchParams: Promise<SearchParams>;
}
