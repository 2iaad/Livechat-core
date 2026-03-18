import { formatMessageTime } from "@/lib/utils";

type MessageBubbleProps = {
	isIncoming: boolean;
	senderImage?: string;
	messageText?: string;
	messageImage?: string | null;
	createdAt: string;
};

export default function MessageBubble({
	isIncoming,
	senderImage,
	messageText,
	messageImage,
	createdAt,
}: MessageBubbleProps) {
	return (
		<div className={`chat ${isIncoming ? "chat-start" : "chat-end"}`}>
			<div className="chat-image avatar">
				<div className="size-10 rounded-full border border-white/20">
					<img src={senderImage || "/avatar.png"} alt="Profile picture" />
				</div>
			</div>

			<div className="chat-header mb-1">
				<time className="ml-1 text-xs text-slate-400">{formatMessageTime(createdAt)}</time>
			</div>

			<div className="chat-bubble flex max-w-[80%] flex-col rounded-2xl bg-slate-800 text-slate-100">
				{messageImage && (
					<img
						src={messageImage}
						className="mb-2 rounded-md sm:max-w-[200px]"
						alt="Attachment"
					/>
				)}
				{messageText && <p>{messageText}</p>}
			</div>
		</div>
	);
}
