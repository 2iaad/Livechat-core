# Chatty MERN App

Real-time messaging platform built with the MERN stack.
Fast chat delivery, online presence, image sharing, and a clean TypeScript frontend.

## Why This Project Stands Out

- Real-time chat powered by WebSockets for instant delivery.
- Auth-first architecture with protected routes and JWT sessions.
- Modern frontend stack with React, TypeScript, Vite, Zustand, and Tailwind CSS.
- Media-ready workflow with Cloudinary-based image uploads.
- Clear separation between frontend and backend for maintainability.

## Core Features

- User authentication: Sign up, login, logout, auth checks.
- Profile management: Avatar upload and profile updates.
- Real-time messaging: Send and receive messages instantly.
- Presence system: See who is online in real time.
- Image messages: Attach images in chats.
- Responsive UI: Works across desktop and mobile layouts.

## Tech Stack

Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS and DaisyUI
- Zustand
- React Router
- Axios

Backend
- Node.js
- Express
- MongoDB and Mongoose
- JWT authentication
- Socket.IO
- Cloudinary

Developer Tooling
- ESLint
- TypeScript

## Project Structure

		Mern-Stack-App/
			Backend/
				src/
					controllers/
					middleware/
					models/
					routes/
					lib/
			Frontend/
				src/
					components/
					store/
					lib/
			ReadmeFiles/

## Quick Start

1. Clone the repository.
2. Install dependencies for both apps.
3. Start backend and frontend in separate terminals.

Backend

		cd Backend
		npm install
		npm run dev

Frontend

		cd Frontend
		npm install
		npm run dev

Default local endpoints
- API base URL: http://localhost:5001/api
- Socket server URL: http://localhost:5001

## Environment Notes

Create environment files for backend and frontend before running in production-like mode.
Typical variables include:

- MongoDB connection string
- JWT secret
- Cloudinary credentials
- Frontend API URL

## Scripts

Backend
- npm run dev: Start backend in development mode

Frontend
- npm run dev: Start Vite development server
- npm run build: Build production bundle
- npm run lint: Run ESLint

## API and Architecture Docs

Additional documentation is available in the ReadmeFiles directory.

- Frontend flow: [ReadmeFiles/FrontCodeFlow.md](ReadmeFiles/FrontCodeFlow.md)
- Message routes: [ReadmeFiles/MessageRoutes.md](ReadmeFiles/MessageRoutes.md)
- WebSocket docs: [ReadmeFiles/WebSockets/WebSockets.md](ReadmeFiles/WebSockets/WebSockets.md)
- Zustand docs: [ReadmeFiles/Zustand/Zustand.md](ReadmeFiles/Zustand/Zustand.md)

## Roadmap Ideas

- Group chats and channels
- Message reactions and read receipts
- Search and message history filters
- Notifications and push integration
- End-to-end tests and CI pipeline

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make focused commits.
4. Open a pull request with a clear description.

## License

This project is open source. Add your preferred license file if not already present.
