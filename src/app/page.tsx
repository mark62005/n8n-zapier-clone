import { requireAuth } from "@/lib/utils/auth";
import { caller } from "@/trpc/server";

/**
 * Renders the homepage and enforces authentication before producing output.
 *
 * When an authenticated user is present, the rendered UI includes a brief sign-in confirmation.
 *
 * @returns The React element for the homepage; if an authenticated user exists, includes a sign-in confirmation message.
 */
export default async function Home() {
	await requireAuth();

	const authUser = await caller.auth.getAuthUser();

	return (
		<div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-y-6">
			{authUser && <span>Signed in sucessfully.</span>}
		</div>
	);
}