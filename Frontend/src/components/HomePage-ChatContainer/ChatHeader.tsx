import { X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";

export default function ChatHeader() {

	const selectedUser = useChatStore(state => state.selectedUser);
	const setSelectedUser = useChatStore(state => state.setSelectedUser);
	const onlineUsers = useAuthStore(state => state.onlineUsers);
	const isSelectedUserOnline = selectedUser ? onlineUsers.includes(selectedUser._id) : false;

	return (
		<div className="border-b border-white/10 bg-slate-900/60 p-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<UserAvatar
						src={selectedUser?.profilePicture}
						alt={selectedUser?.fullName || "Selected user"}
						size="sm"
						isOnline={isSelectedUserOnline}
					/>
					<div>
						<h3 className="font-medium text-slate-100">{selectedUser?.fullName}</h3>
						<p className="text-sm text-slate-400">
							{isSelectedUserOnline ? "Online" : "Offline"}
						</p>
					</div>
				</div>

				<Button onClick={() => setSelectedUser(null)} variant="ghost" size="icon-sm" className="text-slate-300 hover:bg-white/10 hover:text-white">
					<X />
				</Button>
			</div>
		</div>
	);
};