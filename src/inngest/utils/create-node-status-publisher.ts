import { type TExecutableNodeStatus } from "@/types/app/workflows/nodes";
import { type Realtime } from "@inngest/realtime";

type TPublishInput = Promise<Realtime.Message.Input<string, string, unknown>>;

export function createNodeStatusPublisher<TChannelEvent extends TPublishInput>(
	publish: Realtime.PublishFn,
	createEvent: (status: TExecutableNodeStatus) => TChannelEvent
) {
	return (status: TExecutableNodeStatus) => {
		return publish(createEvent(status));
	};
}
