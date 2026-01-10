import { registerHandlebarsHelpers } from "@/lib/utils/syntax-templating/handlebars";
import { executeWorkflow } from "./handlers";

registerHandlebarsHelpers();

export const inngestFunctions = [executeWorkflow];
