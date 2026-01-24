import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";

export default function Navbar() {
	const { authUserObj, logout } = useAuthStore();

	function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		logout(authUserObj!);
	}

	return (
		<header className="fixed shadow-md inset-x-0 top-0 z-30 mx-auto max-w-130 bg-gray-100 py-2 backdrop-blur-lg md:top-6 md:rounded-4xl">
			<div className="px-4 flex justify-between items-center">
				<div className="flex items-center">
					<img className="rounded-full size-10 m-0 p-0" src={authUserObj?.profilePicture} />
					<Link
						to="/profile"
						className="inline-block rounded-4xl px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
					>
						{authUserObj?.fullName}'s Profile
					</Link>
				</div>
				<Link
					className="inline-block rounded-4xl px-3 py-2 text-sm bg-red-400 shadow-lg font-bold text-white transition-all duration-200 hover:bg-red-600"
					onClick={handleLogout}
					to="/login"
				>
					Logout
				</Link>
			</div>
		</header>
	);
}
