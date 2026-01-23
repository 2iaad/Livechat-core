# Frontend Execution Flow: Unauthenticated Visit to `"/"` then Login

This document describes what happens in the frontend when a user:
- Navigates to the root path `/` while **not logged in**
- Then logs in successfully from the login page

---

## 1. App Bootstrapping

1. `src/main.tsx`
   - React mounts the app:
     - `createRoot(...).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>)`
   - This sets up React Router and renders `App` as the root component.

---

## 2. Initial Auth Check on App Load

1. `src/App.tsx`
   - `useAuthStore()` is used to access:
     - `authUserObj`
     - `isCheckingAuth`
     - `checkAuth`
   - `useEffect` runs **once on mount** and calls:
     - `checkAuth()` from `useAuthStore`.

2. `src/store/useAuthStore.ts` → `checkAuth`
   - Sends `GET /auth/check` via `axiosInstance`.
   - **If the user is authenticated (has session/cookie):**
     - Sets `authUserObj` with the returned user.
     - Calls `connectSocket()` to open the websocket connection.
   - **If the user is not authenticated:**
     - Catches the error, logs it, and sets `authUserObj` to `null`.
   - In all cases, sets `isCheckingAuth = false`.

3. While `isCheckingAuth` is `true` and `authUserObj` is `null`:
   - `App` returns a full-screen loading spinner and **no routes are rendered yet**.

---

## 3. Routing Decision for Unauthenticated Visit to `/`

After `checkAuth` finishes:

1. `src/App.tsx` render logic:
   - If `authUserObj` exists:
     - Renders the `Navbar` component.
   - If `authUserObj` is `null`:
     - `Navbar` is **not** rendered.

2. Route configuration in `App`:
   - Route for `/`:
     - `element={authUserObj ? <HomePage /> : <Navigate to="/login" />}`
   - When the user is **not logged in** (`authUserObj === null`):
     - Visiting `/` causes React Router to render `<Navigate to="/login" />`.
     - The user is redirected to `/login`.

Result: An unauthenticated user going directly to `/` ends up seeing the **LoginPage**.

---

## 4. Login Page Flow

1. `src/components/LoginPage.tsx` (default export `LoginForm`)
   - Local state `formData` holds:
     - `email`
     - `password`
   - Uses `useAuthStore()` to access:
     - `login`
     - `isLoggingIn`

2. `handleSubmit` in LoginPage:
   - Prevents default form submit.
   - Validates:
     - Email is non-empty.
     - Email matches a basic email regex.
     - Password is non-empty and at least 6 characters.
   - On valid input:
     - Calls `login(formData)` from `useAuthStore`.

3. `src/store/useAuthStore.ts` → `login`
   - Sets `isLoggingIn = true`.
   - Sends `POST /auth/login` with `{ email, password }`.
   - **On success:**
     - Sets `authUserObj` with the response user.
     - Shows success toast: "Logged to account successfully".
     - Calls `connectSocket()` to establish the websocket connection.
   - **On error:**
     - Shows error toast: "Failed to login".
   - In `finally`:
     - Sets `isLoggingIn = false`.

---

## 5. Post-Login Redirect and UI Update

Once `authUserObj` is set in the store by `login`:

1. `App` re-renders because the Zustand store state changed.

2. `App` routing and layout with `authUserObj` now **non-null**:
   - `Navbar` is rendered at the top of the page.
   - Route for `/login`:
     - `element={authUserObj ? <Navigate to="/" /> : <LoginPage />}`
   - Since the user is now authenticated and currently on `/login`:
     - React Router renders `<Navigate to="/" />`.
     - The user is redirected to `/`.

3. Route for `/` with authenticated user:
   - `element={authUserObj ? <HomePage /> : <Navigate to="/login" />}`
   - With `authUserObj` set, `/` now renders `<HomePage />`.

4. `src/components/HomePage.tsx`
   - Uses `useChatStore()` to get `selectedUser`.
   - Always renders the chat `Sidebar`.
   - If `selectedUser` is null:
     - Shows `NoChatSelected` in the main area.
   - If `selectedUser` is set:
     - Shows `ChatContainer` with the active conversation.

Result: After a successful login, the user is automatically redirected from `/login` to `/` and sees the authenticated **HomePage** with Navbar and chat layout.

---

## 6. Summary of Key Functions by Step

- **Initial auth check on app load**
  - `App` → `useEffect` → `checkAuth()` (useAuthStore)
  - `checkAuth()` → `axiosInstance.get("/auth/check")` → may call `connectSocket()`

- **Routing for unauthenticated visit to `/`**
  - `App` route `/` → `authUserObj ? <HomePage /> : <Navigate to="/login" />`

- **Login submission and auth update**
  - `LoginPage` → `handleSubmit()`
  - `handleSubmit()` → `login(formData)` (useAuthStore)
  - `login()` → `axiosInstance.post("/auth/login")` → set `authUserObj`, call `connectSocket()`

- **Post-login redirects and final view**
  - `App` re-renders with updated `authUserObj`.
  - `/login` route: `authUserObj ? <Navigate to="/" /> : <LoginPage />` → redirect to `/`.
  - `/` route: `authUserObj ? <HomePage /> : <Navigate to="/login" />` → renders `HomePage`.
