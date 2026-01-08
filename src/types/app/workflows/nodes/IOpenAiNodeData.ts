export interface IOpenAiNodeData {
	variableName?: string;
	systemPrompt?: string;
	userPrompt?: string;
	[key: string]: unknown;
}
