export interface IOpenAiNodeData {
	variableName?: string;
	credentialId?: string;
	systemPrompt?: string;
	userPrompt?: string;
	[key: string]: unknown;
}
