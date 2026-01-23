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

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const { signup, isSigningUp } = useAuthStore();

	function validateForm(): boolean {
		if (!formData.fullName.trim())
			return (toast.error("Full name is required"), false);
		if (!formData.email.trim())
			return (toast.error("Email is required"), false);
		if (!/\S+@\S+\.\S+/.test(formData.email))
			return (toast.error("Invalid email format"), false);
		if (!formData.password)
			return (toast.error("Password is required"), false);
		if (formData.password.length < 6)
			return (
				toast.error("Password must be at least 6 characters"),
				false
			);

		return true;
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validateForm()) signup(formData);
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-800">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle>Create an account</CardTitle>
						<CardDescription>
							Enter your information below to create your account
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit}>
							<FieldGroup>
								<Field>
									{" "}
									{/* FullName field */}
									<FieldLabel htmlFor="name">
										Full Name
									</FieldLabel>
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
									{" "}
									{/* Email field */}
									<FieldLabel htmlFor="email">
										Email
									</FieldLabel>
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
									{" "}
									{/* Password field */}
									<FieldLabel htmlFor="password">
										Password
									</FieldLabel>
									<Input id="password" type="password" />
								</Field>

								<Field>
									{" "}
									{/* Confirm Password field */}
									<FieldLabel htmlFor="confirm-password">
										Confirm Password
									</FieldLabel>
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
									<FieldDescription>
										Please confirm your password.
									</FieldDescription>
								</Field>

								<Button type="submit" disabled={isSigningUp}>
									{" "}
									{/* if (isSigningUp = true) The button cannot be clicked, this to prevent double submition */}
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
						<div className="text-center text-muted-foreground text-sm pt-4">
							Already have an account?{" "}
							<Link className="link link-primary" to="/login">
								Login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
