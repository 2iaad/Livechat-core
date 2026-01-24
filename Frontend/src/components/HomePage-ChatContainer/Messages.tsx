import { useEffect } from "react";
import { useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import MessagesSkeleton from "../skeletons/MessagesSkeleton";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime } from "@/lib/utils";

export default function Messages() {

	// using selector to prevent re-render on other variable changes (optimization)
	const authUserObj = useAuthStore((s) => s.authUserObj)
	const isMessagesLoading = useChatStore((s) => s.isMessagesLoading);
	const messages = useChatStore((s) => s.messages);
	const getMessages = useChatStore((s) => s.getMessages);
	const selectedUser = useChatStore((s) => s.selectedUser);

	const listenToMessages = useChatStore((s) => s.listenToMessages);
	const unlistenToMessages = useChatStore((s) => s.unlistenToMessages);

	const messageEnd = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedUser)
		{
			getMessages(selectedUser._id);
			listenToMessages();
		}

		return () => unlistenToMessages();
	}, [selectedUser?._id, getMessages, listenToMessages, unlistenToMessages])

	useEffect(() => {
		if (messageEnd.current && messages)
			messageEnd.current?.scrollIntoView({
				behavior: "smooth",
			});
	}, [messages])

	if (isMessagesLoading) return (<MessagesSkeleton />)

	const messagesArray = messages.map((message) => {
		return (
			<div
				key={message._id}
				ref={messageEnd}
				className={`chat ${message.senderId === selectedUser?._id ? "chat-start" : "chat-end"}`}
			>
				<div className="chat-image avatar">
					<div className="size-10 rounded-full border">
						<img src={`${message.senderId === authUserObj?._id
							? authUserObj.profilePicture
							: selectedUser?.profilePicture}`} alt="Profile picture" />
					</div>
				</div>

				<div className="chat-header mb-1">
					<time className="text-xs opacity-50 ml-1">
						{formatMessageTime(message.createdAt)}
					</time>
				</div>

				<div className="chat-bubble flex flex-col">
					{message.image && (<img src={message.image} className="sm:max-w-[200px] rounded-md mb-2" />)}
					{message.text && <p>{message.text}</p>}
				</div>
			</div>
		)
	})

	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4">
			{messagesArray}
		</div>
	);
};
