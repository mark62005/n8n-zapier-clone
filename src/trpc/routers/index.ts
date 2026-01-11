import { createTRPCRouter } from "../index";

import { authRouter } from "./auth";
import { workflowsRouter } from "./workflows";
import { credentialsRouter } from "./credentials";
import { executionsRouter } from "./executions";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	workflows: workflowsRouter,
	credentials: credentialsRouter,
	executions: executionsRouter,
});

export type TAppRouter = typeof appRouter;
