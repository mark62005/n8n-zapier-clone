import { authClient } from "../auth-client";
import { toast } from "sonner";

function capitalize(word: string): string {
	if (!word) {
		return word;
	}

	return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function signInWith(
	provider: "google" | "github",
	onSuccess: () => void
) {
	await authClient.signIn.social(
		{
			provider,
		},
		{
			onSuccess,
			onError: () => {
				toast.error(`Error signing in with ${capitalize(provider)}.`);
			},
		}
	);
}
