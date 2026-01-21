import { useChatStore } from "../store/useChatStore";

import Sidebar from "./HomePage-Sidebar.tsx";
import NoChatSelected from "./HomePage-NoChatSelected.tsx";
import ChatContainer from "./HomePage-ChatContainer.tsx";

export default function HomePage() {
	const { selectedUser } = useChatStore();

	return (
		<div className="h-screen bg-gray-800">
			<div className="flex items-center justify-center pt-40 px-20">
				<div className="bg-gray-500 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-15rem)]">
					<div className="flex h-full rounded-lg overflow-hidden">
						<Sidebar />
						{!selectedUser ? <NoChatSelected /> : <ChatContainer />}
					</div>
				</div>
			</div>
		</div>
	);
}
