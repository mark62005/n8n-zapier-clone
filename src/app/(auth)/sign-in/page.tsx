import { requireUnauth } from "@/lib/utils/auth";
import SignInForm from "@/components/forms/auth/sign-in/SignInForm";

/**
 * Renders the sign-in page after ensuring the current session is unauthenticated.
 *
 * @returns The JSX element that displays the sign-in form.
 */
async function SignInPage() {
	await requireUnauth();

	return <SignInForm />;
}
export default SignInPage;