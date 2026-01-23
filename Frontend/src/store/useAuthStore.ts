import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

const BACKEND_URL: string = "http://localhost:5001";

type AuthUser = {
	_id: string;
	email: string;
	fullName: string;
	profilePicture: string;
	createdAt: string;
	updatedAt: string;
};
type loginData = { email: string; password: string };
type signupData = loginData & { fullName: string };

interface AuthStoreStates {
	authUserObj: AuthUser | null;
	isSigningUp: boolean;
	isLoggingIn: boolean;
	isUpdatingProfile: boolean;
	isCheckingAuth: boolean;
	onlineUsers: string[];
	socket: Socket | null;
}

interface AuthStoreActions {
	checkAuth: () => Promise<void>;
	signup: (data: signupData) => Promise<void>;
	login: (data: loginData) => Promise<void>;
	logout: (data: AuthUser) => Promise<void>;
	updateProfile: (data: string | ArrayBuffer | null) => Promise<void>;
	connectSocket: () => void;
	disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStoreStates & AuthStoreActions>((set, get) => ({

	// data we are tracking on each browser refresh:
	authUserObj: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/check");
			// in controller i return (req.user), but Axios receives that JSON, and puts it in res.data.
			set({ authUserObj: res.data });

			get().connectSocket();
		} catch (error) {
			// triggered if backend responds with error status code (anything outside 200–299).
			console.log("Error in checkAuth: ", error);
			set({ authUserObj: null });
		} finally {
			set({ isCheckingAuth: false }); // disable spinner: this will be run regardless of success or failure
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });

		try {
			const res = await axiosInstance.post("/auth/signup", data);
			set({ authUserObj: res.data });
			toast.success("Account created successfully");

			get().connectSocket();
		} catch (error) {
			console.log("error");
			toast.error((error as any).response?.data?.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true });

		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({ authUserObj: res.data });
			toast.success("Logged to account successfully");

			get().connectSocket();
		} catch (error) {
			toast.error("Failed to login");
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async (data) => {
		try {
			axiosInstance.post("/auth/logout", data);
			set({ authUserObj: null });
			toast.success("Logged out successfully");

			get().disconnectSocket();
		} catch (error) {
			toast.error("Can't logout user");
		}
	},

	updateProfile: async (profilePicture) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axiosInstance.put("/auth/edit-profile", {
				profilePicture,
			}); // the {} to send an {object: string} not string
			set({ authUserObj: res.data });
			toast.success("Profile photo updated!");
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	connectSocket: () => {
		const { authUserObj } = get();
		if (!authUserObj || get().socket?.connected) return;

		// send the user.id to the backend to add it to online users
		const socket = io(BACKEND_URL, {
			query: {
				userId: authUserObj._id
			}
		}
		);
		socket.connect();
		set({ socket: socket });

		// listen to the brodcast i make when i user is online from backend
		socket.on("xxxGetOnlineUsers", (usersIds) => {
			set({ onlineUsers: usersIds })
		})
	},

	disconnectSocket: () => {
		const { socket } = get();
		if (socket?.connected) socket.disconnect();
	},
}),
);
