import { requireUnauth } from "@/lib/utils/auth";
import SignUpForm from "@/components/forms/auth/sign-up/SignUpForm";

/**
 * Renders the sign-up page for users who are not authenticated.
 *
 * This page enforces that the visitor is unauthenticated before rendering.
 *
 * @returns The React element containing the sign-up form.
 */
async function SignUpPage() {
	await requireUnauth();

	return <SignUpForm />;
}
export default SignUpPage;