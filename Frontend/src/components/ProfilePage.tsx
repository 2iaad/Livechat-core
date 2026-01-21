import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

export default function ProfilePage() {
	const { authUserObj, isUpdatingProfile, updateProfile } = useAuthStore();
	const [selectedImg, setSelectedImg] = useState<string | null>(null); // m3a t updatea photo me3a tre-rendrea component otban new Picture

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file); // read file as string

		reader.onloadend = async () => {
			const base64data = reader.result;
			setSelectedImg(base64data as string); // update state to render new image
			await updateProfile(base64data); // send PUT to backend api
		};
	};

	return (
		<div className="h-screen pt-20 bg-gray-800">
			<div className="max-w-2xl mx-auto p-4 py-8">
				<div className="bg-gray-100 rounded-xl p-6 space-y-8">
					{/* header section*/}
					<div className="text-center">
						<h1 className="text-2xl font-semibold ">Profile</h1>
						<p className="mt-2">Your profile information</p>
					</div>

					{/* avatar upload section */}
					<div className="flex flex-col items-center gap-4">
						<div className="relative">
							<img
								src={selectedImg || authUserObj?.profilePicture}
								className="size-32 rounded-full object-cover border-4 "
							/>
							<label
								htmlFor="avatar-upload"
								className={`
                                                            absolute bottom-0 right-0 
                                                            bg-base-content hover:scale-105
                                                            p-2 rounded-full cursor-pointer 
                                                            transition-all duration-200
                                                            ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                                        `}
							>
								<Camera className="w-5 h-5 text-base-200" />
								<input
									type="file"
									id="avatar-upload"
									className="hidden"
									accept="image/*"
									onChange={handleImageUpload}
									disabled={isUpdatingProfile}
								/>
							</label>
						</div>

						<p className="text-sm text-zinc-400">
							{isUpdatingProfile
								? "Uploading..."
								: "Click the camera icon to update your photo"}
						</p>
					</div>

					{/* user infos section */}
					<div className="space-y-6">
						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<User className="w-4 h-4" />
								Full Name
							</div>
							<p className="px-4 py-2.5 bg-gray-300 rounded-lg border-2 border-red-200">
								{authUserObj?.fullName}
							</p>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<Mail className="w-4 h-4" />
								Email Address
							</div>
							<p className="px-4 py-2.5 bg-gray-300 rounded-lg border-2 border-red-200">
								{authUserObj?.email}
							</p>
						</div>
					</div>

					{/* account infos section */}
					<div className="mt-6 bg-gray-300 rounded-xl p-6 border-2 border-red-200">
						<h2 className="text-lg font-medium  mb-4">
							Account Information
						</h2>
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-between py-2 border-b border-zinc-700">
								<span>Member Since</span>
								<span>
									{authUserObj?.createdAt?.split("T")[0]}
								</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<span>Account Status</span>
								<span className="text-red-500">Active</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
