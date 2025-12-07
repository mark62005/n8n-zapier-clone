import SignOutButton from "@/components/auth/SignOutButton";
import { requireAuth } from "@/lib/utils/auth";
import { caller } from "@/trpc/server";

export default async function Home() {
	await requireAuth();

	const authUser = await caller.auth.getAuthUser();

	return (
		<div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-y-6">
			{authUser && <span>Signed in sucessfully.</span>}

			{authUser && <SignOutButton />}
		</div>
	);
}
