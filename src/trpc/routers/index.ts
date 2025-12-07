import { createTRPCRouter } from "../index";
import { testingRouter } from "./testing";
import { authRouter } from "./auth";

export const appRouter = createTRPCRouter({
	testings: testingRouter,
	auth: authRouter,
});

export type TAppRouter = typeof appRouter;
