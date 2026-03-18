import type { ReactNode } from "react";

interface ProfileInfoFieldProps {
	icon: ReactNode;
	label: string;
	value: string;
}

export default function ProfileInfoField({
	icon,
	label,
	value,
}: ProfileInfoFieldProps) {
	return (
		<div className="space-y-1.5">
			<div className="flex items-center gap-2 text-sm text-slate-500">
				{icon}
				<span>{label}</span>
			</div>
			<p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800">
				{value}
			</p>
		</div>
	);
}
