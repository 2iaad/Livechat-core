# MERN Application

A full‑stack MERN project that lets people exchange messages, images, and presence updates in real time.
* The backend exposes a REST API with JWT-based auth and image uploads
* The frontend provides a responsive, Tailwind‑styled interface built using the Zustand global state library.

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, DaisyUI, Zustand, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary, Socket.IO
- **Tooling:** ESLint, TypeScript, Vite dev server

## Run Locally

```bash
# Backend
cd Backend
npm install
npm run dev

# Frontend (in another terminal)
cd Frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:5001/api` and connects to the realtime server on `http://localhost:5001`.
