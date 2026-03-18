import type { User } from "@/store/useChatStore";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/shared/UserAvatar";

interface UserListItemProps {
	user: User;
	isSelected: boolean;
	isOnline: boolean;
	onSelect: (user: User) => void;
}

export default function UserListItem({
	user,
	isSelected,
	isOnline,
	onSelect,
}: UserListItemProps) {
	return (
		<button
			onClick={() => onSelect(user)}
			className={cn(
				"w-full rounded-xl px-3 py-2.5 text-left transition-colors",
				"hover:bg-white/10",
				isSelected && "bg-white/12 ring-1 ring-white/20",
			)}
		>
			<div className="flex items-center gap-3">
				<UserAvatar
					src={user.profilePicture}
					alt={user.fullName}
					size="md"
					isOnline={isOnline}
					className="mx-auto lg:mx-0"
				/>
				<div className="hidden min-w-0 lg:block">
					<p className="truncate font-medium text-slate-100">{user.fullName}</p>
					<p className="text-xs text-slate-400">{isOnline ? "Online" : "Offline"}</p>
				</div>
			</div>
		</button>
	);
}
