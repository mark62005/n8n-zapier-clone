import { requireAuth } from "@/lib/utils/auth";

async function ExecutionsPage() {
	await requireAuth();

	return (
		<div>
			<div className=""></div>ExecutionsPage
		</div>
	);
}
export default ExecutionsPage;
