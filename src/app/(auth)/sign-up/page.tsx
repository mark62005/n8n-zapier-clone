import { requireUnauth } from "@/lib/utils/auth";
import SignUpForm from "@/components/forms/auth/sign-up/SignUpForm";

async function SignUpPage() {
	await requireUnauth();

	return <SignUpForm />;
}
export default SignUpPage;
