import ChatHeader from "./HomePage-ChatContainer/ChatHeader";
import MessageInput from "./HomePage-ChatContainer/MessageInput";
import Messages from "./HomePage-ChatContainer/Messages";

export default function ChatContainer() {
	return (
		<div className="flex flex-1 flex-col overflow-auto">
			<ChatHeader />
			<Messages />
			<MessageInput />
		</div>
	);
}
