import { Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./components/HomePage"
import SignUpPage from "./components/SignUpPage"
import LoginPage from "./components/LoginPage"
import ProfilePage from "./components/ProfilePage"

import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

export default function App() {

	const { authUserObj, isCheckingAuth, checkAuth, onlineUsers } = useAuthStore();

	console.log({onlineUsers})
	
	useEffect(() => {
		checkAuth();
	}, [checkAuth])
	
	if (isCheckingAuth && !authUserObj) // show spinner
	{
		return (
			<div className="flex items-center justify-center h-screen">
				<span className="loading loading-spinner loading-xl"></span>
			</div>
		)
	}

	return (
		<div>
			{authUserObj && <Navbar />}
			<Routes>
				{/* If logged in, go to Home. If not, go to Login */}
				<Route path="/" element={authUserObj ? <HomePage /> : <Navigate to="/login" />} />
				{/* If logged in, go to Home. If not, its ok */}
				<Route path="/signup" element={authUserObj ? <Navigate to="/" /> : <SignUpPage />} />
				<Route path="/login" element={authUserObj ? <Navigate to="/" /> : <LoginPage />} />
				{/* If logged in, go to profile. If not go to login */}
				<Route path="/profile" element={authUserObj ? <ProfilePage /> : <Navigate to="/login" />} />
				{/* Catch-all: redirect unknown routes to home */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Toaster />
		</div>
	)
}