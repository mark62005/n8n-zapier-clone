"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";

function SignOutButton() {
	const router = useRouter();

	async function signOut() {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
				},
			},
		});
	}

	return (
		<Button
			variant={"destructive"}
			onClick={signOut}
		>
			Sign Out
		</Button>
	);
}
export default SignOutButton;
