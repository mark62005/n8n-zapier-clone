export interface IHttpRequestNodeData {
	endpoint?: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: string;
	[key: string]: unknown;
}
