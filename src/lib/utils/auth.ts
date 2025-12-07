import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

/**
 * Ensures the current request is associated with an authenticated user and redirects to the sign-in page if not.
 *
 * Retrieves the current session and performs a server-side redirect to "/sign-in" when no session is present.
 *
 * @returns The current authenticated session object when a user is signed in.
 */
export async function requireAuth() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}
	return session;
}

/**
 * Ensures the current request is unauthenticated, redirecting to the home page if a session exists.
 *
 * If an authenticated session is found, performs a server-side redirect to "/". If no session exists,
 * the function completes without returning a value.
 */
export async function requireUnauth() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/");
	}
}