import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	const { authUserObj, logout } = useAuthStore();

	function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		logout(authUserObj!);
	}

	return (
		<header className="fixed inset-x-4 top-4 z-30 mx-auto w-auto max-w-5xl rounded-2xl border border-white/20 bg-white/90 py-2 shadow-lg backdrop-blur md:top-6">
			<div className="flex items-center justify-between px-3 sm:px-5">
				<Link to="/profile" className="group flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-slate-100">
					<UserAvatar
						src={authUserObj?.profilePicture}
						alt={authUserObj?.fullName || "Profile"}
						size="sm"
					/>
					<div className="hidden sm:block">
						<p className="text-sm font-semibold text-slate-900">{authUserObj?.fullName}</p>
						<p className="text-xs text-slate-500 group-hover:text-slate-700">View profile</p>
					</div>
				</Link>

				<Button asChild variant="destructive" size="sm">
					<Link onClick={handleLogout} to="/login">
						Logout
					</Link>
				</Button>
			</div>
		</header>
	);
}
