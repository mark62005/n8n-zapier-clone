import { requireAuth } from "@/lib/utils/auth";

async function CredentialsPage() {
	await requireAuth();

	return (
		<div>
			<div className=""></div>CredentialsPage
		</div>
	);
}
export default CredentialsPage;
