import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import UserAvatar from "@/components/shared/UserAvatar";
import ProfileInfoField from "@/components/shared/ProfileInfoField";
import { Button } from "@/components/ui/button";

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
		<div className="relative min-h-screen bg-slate-950 pt-24">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.2),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(248,113,113,0.22),transparent_30%)]" />
			<div className="relative mx-auto max-w-2xl p-4 pb-8">
				<div className="space-y-8 rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
					<div className="text-center">
						<h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
						<p className="mt-2 text-slate-600">Your profile information</p>
					</div>

					<div className="flex flex-col items-center gap-4">
						<div className="relative">
							<UserAvatar
								src={selectedImg || authUserObj?.profilePicture}
								alt={authUserObj?.fullName || "Profile"}
								size="lg"
								className="[&_img]:border-4 [&_img]:border-slate-200 [&_img]:size-32"
							/>
							<label htmlFor="avatar-upload" className="absolute bottom-0 right-0">
								<Button
									asChild
									size="icon"
									className={isUpdatingProfile ? "pointer-events-none animate-pulse" : ""}
								>
									<span>
										<Camera className="h-5 w-5" />
									</span>
								</Button>
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

						<p className="text-sm text-slate-500">
							{isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
						</p>
					</div>

					<div className="space-y-6">
						<ProfileInfoField
							icon={<User className="h-4 w-4" />}
							label="Full Name"
							value={authUserObj?.fullName || ""}
						/>
						<ProfileInfoField
							icon={<Mail className="h-4 w-4" />}
							label="Email Address"
							value={authUserObj?.email || ""}
						/>
					</div>

					<div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
						<h2 className="mb-4 text-lg font-medium text-slate-900">Account Information</h2>
						<div className="space-y-3 text-sm text-slate-700">
							<div className="flex items-center justify-between border-b border-slate-200 py-2">
								<span>Member Since</span>
								<span>{authUserObj?.createdAt?.split("T")[0]}</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<span>Account Status</span>
								<span className="font-medium text-emerald-600">Active</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
