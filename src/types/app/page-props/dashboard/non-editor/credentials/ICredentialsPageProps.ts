import type { SearchParams } from "nuqs/server";

export interface ICredentialsPageProps {
	searchParams: Promise<SearchParams>;
}
