import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.tsx";
import { Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
	const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers } = useAuthStore();

	const [showOnlineOnly, setShowOnlineOnly] = useState(false);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	let filteredUsers;
	showOnlineOnly ? filteredUsers = users.filter(user => onlineUsers.includes(user._id)) : filteredUsers = users;

	if (isUsersLoading) return <SidebarSkeleton />;

	return (
		<aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
			{/* Users header section */}
			<div className="border-b border-base-300 w-full p-5">
				<div className="flex items-center gap-2">
					<Users className="size-6" /> {/* icon */}
					<span className="font-medium hidden lg:block">Contacts</span>
				</div>
				{/* TODO: Online filter toggle */}
				<div className="mt-3 hidden lg:flex items-center gap-2">
					<label className="cursor-pointer flex items-center gap-2">
						<input
							type="checkbox"
							checked={showOnlineOnly}
							onChange={(e) => setShowOnlineOnly(e.target.checked)}
							className="checkbox checkbox-sm bg-black"
						/>
						<span className="text-sm">Show online users</span>
					</label>
					<span className="text-xs text-black-500">({onlineUsers.length - 1} online)</span>
				</div>
			</div>

			{/* Users section */}
			<div className="overflow-y-auto w-full py-3">
				{filteredUsers.map((user) => (
					<button
						key={user._id}
						onClick={() => setSelectedUser(user)}
						className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-base-300" : ""}
            `}
					>
						<div className="relative mx-auto lg:mx-0">
							<img
								src={user.profilePicture}
								alt={user.fullName}
								className="size-12 object-cover rounded-full"
							/>
							{onlineUsers.includes(user._id) ? (<span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-1 ring-zinc-600" />) : (<span className="" />)}
						</div>
						<div className="hidden lg:block text-left min-w-0">
							<div className="font-medium text-white truncate">
								{user.fullName}
							</div>
						</div>
					</button>
				))}

				{users.length === 0 && (
					<div className="text-center text-black py-4">No online users</div>
				)}
			</div>
		</aside >
	);
}
