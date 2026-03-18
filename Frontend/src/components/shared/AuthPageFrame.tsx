import type { ReactNode } from "react";

interface AuthPageFrameProps {
	title: string;
	description: string;
	children: ReactNode;
	footer: ReactNode;
}

export default function AuthPageFrame({
	title,
	description,
	children,
	footer,
}: AuthPageFrameProps) {
	return (
		<div className="relative min-h-svh overflow-hidden bg-slate-950">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,113,133,0.18),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.2),transparent_36%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.16),transparent_40%)]" />

			<div className="relative mx-auto flex min-h-svh w-full max-w-6xl items-center gap-6 p-4 sm:p-8 lg:grid lg:grid-cols-2">
				<section className="hidden rounded-3xl border border-white/15 bg-white/5 p-10 text-white shadow-2xl backdrop-blur lg:block">
					<p className="mb-4 text-sm uppercase tracking-[0.22em] text-cyan-200/80">
						Chat Platform
					</p>
					<h1 className="text-4xl font-semibold leading-tight">{title}</h1>
					<p className="mt-5 max-w-sm text-white/80">{description}</p>
				</section>

				<section className="w-full rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl sm:p-8">
					{children}
					<div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-600">
						{footer}
					</div>
				</section>
			</div>
		</div>
	);
}
