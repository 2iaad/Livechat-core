import { useEffect } from "react";
import { useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import MessagesSkeleton from "../skeletons/MessagesSkeleton";
import { useAuthStore } from "@/store/useAuthStore";
import MessageBubble from "./MessageBubble";

export default function Messages() {

	// using selector to prevent re-render on other variable changes (optimization)
	const authUserObj = useAuthStore((s) => s.authUserObj)
	const isMessagesLoading = useChatStore((s) => s.isMessagesLoading);
	const messages = useChatStore((s) => s.messages);
	const getMessages = useChatStore((s) => s.getMessages);
	const selectedUser = useChatStore((s) => s.selectedUser);
	const selectedUserId = selectedUser?._id;
	const listenToMessages = useChatStore((s) => s.listenToMessages);
	const unlistenToMessages = useChatStore((s) => s.unlistenToMessages);

	const messageEnd = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedUserId) {
			getMessages(selectedUserId);
			listenToMessages();
		}

		return () => unlistenToMessages();
	}, [selectedUserId, getMessages, listenToMessages, unlistenToMessages])

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
				className="space-y-1"
			>
				<MessageBubble
					isIncoming={message.senderId === selectedUser?._id}
					senderImage={
						message.senderId === authUserObj?._id
							? authUserObj.profilePicture
							: selectedUser?.profilePicture
					}
					messageImage={message.image}
					messageText={message.text}
					createdAt={message.createdAt}
				/>
			</div>
		)
	})

	return (
		<div className="flex-1 space-y-4 overflow-y-auto bg-slate-950/50 p-4">
			{messagesArray}
		</div>
	);
};
