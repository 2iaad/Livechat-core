import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.tsx";
import { Users } from "lucide-react";
import { useEffect } from "react";

export default function Sidebar() {
	const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers } = useAuthStore();

	useEffect(() => {
		getUsers();
	}, [getUsers]);

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
			</div>

			{/* Users section */}
			<div className="overflow-y-auto w-full py-3">
				{users.map((user) => (
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
							{onlineUsers.includes(user._id) && (
								<span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
							)}
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
		</aside>
	);
}
