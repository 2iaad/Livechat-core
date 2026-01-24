import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export type User = { _id: string; fullName: string; profilePicture?: string };
type Message = {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image: string | null;
    createdAt: string
};
type MessageData = {
    text?: string;
    image?: string | null;
}

interface ChatStoreStates {
    users: User[],
    messages: Message[],
    selectedUser: User | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
}

interface ChatStoreActions {
    getUsers: () => Promise<void>;
    getMessages: (otherUserId: string) => Promise<void>;
    sendMessage: (message: MessageData) => Promise<void>;
    setSelectedUser: (selectedUser: User | null) => void;
    listenToMessages: () => void;
    unlistenToMessages: () => void;
}

export const useChatStore = create<ChatStoreStates & ChatStoreActions>((set, get) => ({

    users: [],
    messages: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (selectedUser: User | null) => set({ selectedUser: selectedUser }),

    getUsers: async () => {

        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get<User[]>("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error("Error: in useChatStore(): Could't load users!")
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (otherUserId: string) => {

        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get<Message[]>(`/messages/${otherUserId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error("Error: in useChatStore(): Could't load messages!")
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (message: MessageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, message);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error("Error: in sendMessage(): couldn't send message!");
        }
    },

    listenToMessages: () => {
        const selectedUser = get().selectedUser;
        if (!selectedUser)
            return;

        console.log("listenToMessages\n");
        const socket = useAuthStore.getState().socket;

        socket?.off("xxxNewMessage");
        socket?.on("xxxNewMessage", (newMessage) => {
            if (selectedUser._id != newMessage.senderId)
                return;
            set({ messages: [...get().messages, newMessage] });
        })
    },

    unlistenToMessages: () => {
        const socket = useAuthStore.getState().socket;

        console.log("un-listenToMessages\n");
        socket?.off("xxxNewMessage");
    }
}))