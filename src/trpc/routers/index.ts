import { createTRPCRouter } from "../index";

import { authRouter } from "./auth";
import { workflowsRouter } from "./workflows";
import { credentialsRouter } from "./credentials";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	workflows: workflowsRouter,
	credentials: credentialsRouter,
});

export type TAppRouter = typeof appRouter;
