import { createTRPCRouter } from "../index";
import { testingRouter } from "./testing";
import { authRouter } from "./auth";
import { workflowsRouter } from "./workflows";

export const appRouter = createTRPCRouter({
	testings: testingRouter,
	auth: authRouter,
	workflows: workflowsRouter,
});

export type TAppRouter = typeof appRouter;
