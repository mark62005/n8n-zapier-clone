export interface IHttpRequestNodeData {
	variableName?: string;
	endpoint?: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: string;
	[key: string]: unknown;
}
