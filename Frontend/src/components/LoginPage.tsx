import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import AuthPageFrame from "@/components/shared/AuthPageFrame";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { login, isLoggingIn } = useAuthStore();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!formData.email.trim()) return (toast.error("Email is required"), false);
		if (!/\S+@\S+\.\S+/.test(formData.email))
			return (toast.error("Invalid email format"), false);
		if (!formData.password) return (toast.error("Password is required"), false);
		if (formData.password.length < 6)
			return (toast.error("Password must be at least 6 characters"), false);

		login(formData);
	}

	return (
		<AuthPageFrame
			title="Welcome back"
			description="Sign in and continue your conversations in one place."
			footer={
				<>
					Don&apos;t have an account?{" "}
					<Link to="/signup" className="font-medium text-sky-700 hover:text-sky-900">
						Sign up
					</Link>
				</>
			}
		>
			<Card className="border-slate-200 bg-transparent p-0 shadow-none">
				<CardHeader className="px-0 pb-0">
					<CardTitle className="text-2xl text-slate-900">Login to your account</CardTitle>
					<CardDescription>Enter your email and password to continue.</CardDescription>
				</CardHeader>
				<CardContent className="px-0 pt-2">
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									onChange={(e) => {
										setFormData({
											...formData,
											email: e.target.value,
										});
									}}
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									id="password"
									type="password"
									onChange={(e) => {
										setFormData({
											...formData,
											password: e.target.value,
										});
									}}
								/>
							</Field>

							<Field>
								<Button type="submit" disabled={isLoggingIn} className="w-full">
									{isLoggingIn ? (
										<>
											<Loader className="size-5 animate-spin" />
											Loading...
										</>
									) : (
										"Login"
									)}
								</Button>
								<FieldDescription className="text-center">
									Use the same account you use on your devices.
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AuthPageFrame>
	);
}
