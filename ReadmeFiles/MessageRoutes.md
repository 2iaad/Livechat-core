# Messages API Flow (Frontend ↔ Backend)

## Shared setup

- All message routes are defined in [`messages.route.router`](Backend/src/routes/messages.route.ts) and protected by [`auth.middleware.protectRoute`](Backend/src/middleware/auth.middleware.ts).
- Frontend HTTP calls use [`axios.axiosInstance`](Frontend/src/lib/axios.ts) with `baseURL = "http://localhost:5001/api"`.

---

## 1. Load contacts sidebar — `GET /api/messages/users`

### Backend

1. Browser calls `GET /api/messages/users`.
2. Express matches `router.get("/users", getUsersForSideBar)` in [`messages.route.router`](../Backend/src/routes/messages.route.ts).
3. [`auth.middleware.protectRoute`](Backend/src/middleware/auth.middleware.ts) runs, attaches `req.user`.
4. [`message.controllers.getUsersForSideBar`](../Backend/src/controllers/message.controllers.ts) queries all users except the logged-in one and returns JSON.

### Frontend

1. [`Sidebar`](Frontend/src/components/HomePage-Sidebar.tsx) mounts.
2. `useEffect` in [`Sidebar`](Frontend/src/components/HomePage-Sidebar.tsx) calls [`useChatStore.getUsers`](../Frontend/src/store/useChatStore.ts).
3. [`useChatStore.getUsers`](../Frontend/src/store/useChatStore.ts) does  
   `axiosInstance.get<User[]>("/messages/users")` via [`axios.axiosInstance`](../Frontend/src/lib/axios.ts).
4. On success it updates `users` in the store, causing [`Sidebar`](../Frontend/src/components/HomePage-Sidebar.tsx) to re-render with the contact list.

---

## 2. Load conversation messages — `GET /api/messages/:id`

### Backend

1. Browser calls `GET /api/messages/:id` where `:id` is the other user's id.
2. Express matches `router.get("/:id", getMessages)` in [`messages.route.router`](Backend/src/routes/messages.route.ts).
3. [`auth.middleware.protectRoute`](Backend/src/middleware/auth.middleware.ts) adds `req.user`.
4. [`message.controllers.getMessages`](Backend/src/controllers/message.controllers.ts) finds all messages where  
   - `senderId = me && recieverId = otherUserId` or  
   - `senderId = otherUserId && recieverId = me`  
   and returns them as JSON.

### Frontend

1. When a contact is clicked in [`Sidebar`](Frontend/src/components/HomePage-Sidebar.tsx), it calls [`useChatStore.setSelectedUser`](Frontend/src/store/useChatStore.ts) to set [`useChatStore.selectedUser`](Frontend/src/store/useChatStore.ts).
2. [`Messages`](Frontend/src/components/HomePage-ChatContainer/Messages.tsx) has a `useEffect` watching `selectedUser._id`.
3. When `selectedUser` changes, it calls [`useChatStore.getMessages`](Frontend/src/store/useChatStore.ts).
4. [`useChatStore.getMessages`](Frontend/src/store/useChatStore.ts) calls  
   `axiosInstance.get<Message[]>(\`/messages/${otherUserId}\`)`.
5. On success it updates `messages` in the store; [`Messages`](Frontend/src/components/HomePage-ChatContainer/Messages.tsx) maps over `messages` and renders each bubble.

---

## 3. Send a message — `POST /api/messages/send/:id`

### Backend

1. Browser calls `POST /api/messages/send/:id` with body `{ text?, image? }`.
2. Express matches `router.post("/send/:id", sendMessage)` in [`messages.route.router`](Backend/src/routes/messages.route.ts).
3. [`auth.middleware.protectRoute`](Backend/src/middleware/auth.middleware.ts) supplies `req.user._id` as `senderId`.
4. [`message.controllers.sendMessage`](Backend/src/controllers/message.controllers.ts):
   - Optionally uploads `image` to Cloudinary and gets `imageUrl`.
   - Creates and saves a new `Message` document.
   - Returns the saved message JSON.

### Frontend

1. User types text / selects image in [`MessageInput`](Frontend/src/components/HomePage-ChatContainer/MessageInput.tsx).
2. On submit, `handleSendMessage` in [`MessageInput`](Frontend/src/components/HomePage-ChatContainer/MessageInput.tsx) calls [`useChatStore.sendMessage`](Frontend/src/store/useChatStore.ts) with `{ text, image }`.
3. [`useChatStore.sendMessage`](Frontend/src/store/useChatStore.ts):
   - Reads [`useChatStore.selectedUser`](Frontend/src/store/useChatStore.ts) to get `receiverId`.
   - Calls `axiosInstance.post(\`/messages/send/${selectedUser._id}\`, message)`.
   - On success, appends the returned message to `messages` in the store.
4. [`Messages`](Frontend/src/components/HomePage-ChatContainer/Messages.tsx) re-renders and shows the new message immediately.