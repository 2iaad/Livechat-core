import { cn } from "@/lib/utils";

interface UserAvatarProps {
	src?: string;
	alt: string;
	size?: "sm" | "md" | "lg";
	isOnline?: boolean;
	className?: string;
}

const sizeClasses = {
	sm: "size-9",
	md: "size-11",
	lg: "size-14",
} as const;

export default function UserAvatar({
	src,
	alt,
	size = "md",
	isOnline,
	className,
}: UserAvatarProps) {
	return (
		<div className={cn("relative shrink-0", className)}>
			<img
				src={src || "/avatar.png"}
				alt={alt}
				className={cn(
					"rounded-full border border-slate-200 object-cover shadow-sm",
					sizeClasses[size],
				)}
			/>
			{typeof isOnline === "boolean" && (
				<span
					className={cn(
						"absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-white",
						isOnline ? "bg-emerald-500" : "bg-slate-400",
					)}
				/>
			)}
		</div>
	);
}
