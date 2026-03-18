import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.tsx";
import { Users } from "lucide-react";
import { useState, useEffect } from "react";
import UserListItem from "./HomePage-Sidebar/UserListItem.tsx";

export default function Sidebar() {

	const users = useChatStore(s => s.users);
	const getUsers = useChatStore(s => s.getUsers);
	const isUsersLoading = useChatStore(s => s.isUsersLoading);
	const selectedUser = useChatStore(s => s.selectedUser);
	const setSelectedUser = useChatStore(s => s.setSelectedUser);
	const onlineUsers = useAuthStore(s => s.onlineUsers);

	const [showOnlineOnly, setShowOnlineOnly] = useState(false);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const filteredUsers = showOnlineOnly
		? users.filter(user => onlineUsers.includes(user._id))
		: users;

	if (isUsersLoading) return <SidebarSkeleton />;

	return (
		<aside className="flex h-full w-20 flex-col border-r border-white/10 bg-slate-950/80 transition-all duration-200 lg:w-80">
			<div className="w-full border-b border-white/10 p-4 lg:p-5">
				<div className="flex items-center gap-2">
					<Users className="size-5 text-cyan-200" />
					<span className="hidden font-medium text-slate-100 lg:block">Contacts</span>
				</div>

				<div className="mt-3 hidden items-center gap-2 lg:flex">
					<label className="flex cursor-pointer items-center gap-2 text-slate-200">
						<input
							type="checkbox"
							checked={showOnlineOnly}
							onChange={(e) => setShowOnlineOnly(e.target.checked)}
							className="checkbox checkbox-sm border-slate-300 bg-slate-100"
						/>
						<span className="text-sm">Show online users</span>
					</label>
					<span className="text-xs text-slate-400">({onlineUsers.length - 1} online)</span>
				</div>
			</div>

			<div className="w-full space-y-1 overflow-y-auto p-3">
				{filteredUsers.map((user) => (
					<UserListItem
						key={user._id}
						user={user}
						isOnline={onlineUsers.includes(user._id)}
						isSelected={selectedUser?._id === user._id}
						onSelect={setSelectedUser}
					/>
				))}

				{users.length === 0 && (
					<div className="py-4 text-center text-slate-400">No online users</div>
				)}
			</div>
		</aside >
	);
}
