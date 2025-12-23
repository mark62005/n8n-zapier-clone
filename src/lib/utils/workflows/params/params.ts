import { parseAsInteger, parseAsString } from "nuqs/server";
import { PAGINATION } from "@/lib/constants/configs/dashboard/Pagination";

export const workflowsParams = {
	page: parseAsInteger
		.withDefault(PAGINATION.DEFAULT_PAGE)
		.withOptions({ clearOnDefault: true }),
	pageSize: parseAsInteger
		.withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
		.withOptions({ clearOnDefault: true }),
	searchQuery: parseAsString
		.withDefault("")
		.withOptions({ clearOnDefault: true }),
};
