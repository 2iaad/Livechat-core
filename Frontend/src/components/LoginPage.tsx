import { cn } from "@/lib/utils";
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

export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { login, isLoggingIn } = useAuthStore();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

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

		login(formData);
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-800">
			<div className="w-full max-w-sm">
				<div className={cn("flex flex-col gap-6")}>
					<Card>
						<CardHeader>
							<CardTitle>Login to your account</CardTitle>
							<CardDescription>
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="email">
											Email
										</FieldLabel>
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
										<FieldLabel
											className="flex items-center"
											htmlFor="password"
										>
											Password
										</FieldLabel>
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
										<Button
											type="submit"
											disabled={isLoggingIn}
										>
											{" "}
											{/* if (isSigningUp = true) The button cannot be clicked, this to prevent double submition */}
											{isLoggingIn ? (
												<>
													<Loader className="size-5 animate-spin"></Loader>
													Loading...
												</>
											) : (
												"Login"
											)}
										</Button>
										{/* <Button variant="outline" type="button">
                                            Login with Google
                                        </Button> */}
										<FieldDescription className="text-center">
											Don&apos;t have an account?{" "}
											<Link to="/signup">signUp</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
