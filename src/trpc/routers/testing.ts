import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "../index";

export const testingRouter = createTRPCRouter({
	hello: baseProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),
});

export type TestingRouter = typeof testingRouter;
