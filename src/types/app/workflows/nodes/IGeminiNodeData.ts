export interface IGeminiNodeData {
	variableName?: string;
	credentialId?: string;
	systemPrompt?: string;
	userPrompt?: string;
	[key: string]: unknown;
}
