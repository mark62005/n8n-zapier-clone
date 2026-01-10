import Handlebars from "handlebars";

export function registerJsonHelper(): void {
	Handlebars.registerHelper("json", (context: unknown) => {
		try {
			const jsonString = JSON.stringify(context, null, 2);
			const safeString = new Handlebars.SafeString(jsonString);

			return safeString;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			throw new Error(`Failed to serialize context to JSON: ${errorMessage}`);
		}
	});
}
