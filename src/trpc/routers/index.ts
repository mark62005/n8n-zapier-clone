import { createTRPCRouter } from "../index";
import { authRouter } from "./auth";
import { workflowsRouter } from "./workflows";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	workflows: workflowsRouter,
});

export type TAppRouter = typeof appRouter;
