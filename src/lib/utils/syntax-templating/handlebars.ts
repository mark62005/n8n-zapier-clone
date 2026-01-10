import { registerJsonHelper } from "./helpers/json";

let registered = false;

export function registerHandlebarsHelpers() {
	if (registered) {
		return;
	}

	registerJsonHelper();
	registered = true;
}
