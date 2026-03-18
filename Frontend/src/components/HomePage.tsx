import { useChatStore } from "../store/useChatStore";

import Sidebar from "./HomePage-Sidebar.tsx";
import NoChatSelected from "./HomePage-NoChatSelected.tsx";
import ChatContainer from "./HomePage-ChatContainer.tsx";

export default function HomePage() {
	const selectedUser = useChatStore(state => state.selectedUser);

	return (
		<div className="relative min-h-screen overflow-hidden bg-slate-950 pt-20 sm:pt-24">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.25),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(251,113,133,0.2),transparent_30%),radial-gradient(circle_at_30%_80%,rgba(16,185,129,0.2),transparent_35%)]" />
			<div className="relative mx-auto flex h-[calc(100vh-6rem)] w-full max-w-6xl px-3 pb-3 sm:px-6 sm:pb-6">
				<div className="flex h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/85 shadow-2xl backdrop-blur-xl">
					<Sidebar />
					{!selectedUser ? <NoChatSelected /> : <ChatContainer />}
				</div>
			</div>
		</div>
	);
}
