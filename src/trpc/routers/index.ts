import { createTRPCRouter } from "../index";
import { testingRouter } from "./testing";

export const appRouter = createTRPCRouter({
	testings: testingRouter,
});

export type TAppRouter = typeof appRouter;
