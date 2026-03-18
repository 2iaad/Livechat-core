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
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import AuthPageFrame from "@/components/shared/AuthPageFrame";

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const { signup, isSigningUp } = useAuthStore();

	function validateForm(): boolean {
		if (!formData.fullName.trim()) return (toast.error("Full name is required"), false);
		if (!formData.email.trim()) return (toast.error("Email is required"), false);
		if (!/\S+@\S+\.\S+/.test(formData.email))
			return (toast.error("Invalid email format"), false);
		if (!formData.password) return (toast.error("Password is required"), false);
		if (formData.password.length < 6)
			return (toast.error("Password must be at least 6 characters"), false);

		return true;
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validateForm()) signup(formData);
	};

	return (
		<AuthPageFrame
			title="Start chatting in minutes"
			description="Create your account and jump right into realtime conversations."
			footer={
				<>
					Already have an account?{" "}
					<Link className="font-medium text-sky-700 hover:text-sky-900" to="/login">
						Login
					</Link>
				</>
			}
		>
			<Card className="border-slate-200 bg-transparent p-0 shadow-none">
				<CardHeader className="px-0 pb-0">
					<CardTitle className="text-2xl text-slate-900">Create an account</CardTitle>
					<CardDescription>Enter your information below to create your account.</CardDescription>
				</CardHeader>

				<CardContent className="px-0 pt-2">
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Full Name</FieldLabel>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									onChange={(e) =>
										setFormData({
											...formData,
											fullName: e.target.value,
										})
									}
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input id="password" type="password" />
							</Field>

							<Field>
								<FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
								<Input
									id="confirm-password"
									type="password"
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
								/>
								<FieldDescription>Please confirm your password.</FieldDescription>
							</Field>

							<Button type="submit" disabled={isSigningUp} className="w-full">
								{isSigningUp ? (
									<>
										<Loader2 className="size-5 animate-spin" />
										Loading...
									</>
								) : (
									"Create Account"
								)}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</AuthPageFrame>
	);
}
