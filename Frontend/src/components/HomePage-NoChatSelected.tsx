import { MessageSquare } from "lucide-react";

export default function NoChatSelected() {
	return (
		<div className="flex w-full flex-1 flex-col items-center justify-center bg-slate-900/40 p-10">
			<div className="max-w-md text-center space-y-6">
				<div className="flex justify-center gap-4 mb-4">
					<div className="relative">
						<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg shadow-cyan-700/20">
							<MessageSquare className="h-8 w-8 text-cyan-200" />
						</div>
					</div>
				</div>

				<h2 className="text-2xl font-bold text-slate-100">
					Welcome to Chatty!
				</h2>
				<p className="text-slate-300/85">
					Select a conversation from the sidebar to start chatting
				</p>
			</div>
		</div>
	);
}
