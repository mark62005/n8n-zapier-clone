import { requireUnauth } from "@/lib/utils/auth";
import SignInForm from "@/components/forms/auth/sign-in/SignInForm";

async function SignInPage() {
	await requireUnauth();

	return <SignInForm />;
}
export default SignInPage;
