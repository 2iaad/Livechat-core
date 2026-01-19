import express from "express"
import cookieParser from "cookie-parser";
import { config } from "dotenv"
import cors from "cors"
import { app, server } from "./lib/socket.ts";

import authRoutes from "./routes/auth.route.ts"
import messagesRoutes from "./routes/messages.route.ts"
import { connectDB } from "./lib/db.ts"

// Reads your .env file + Loads values into process.env
config();
const PORT = process.env.PORT

/**
 ->  express.json() is a built-in middleware in Express.
 ->  Middleware = function that runs for every request before it reaches your route handlers.
 ->  express.json() parses incoming request bodies that are in JSON format.
 ->  It makes the data available on req.body inside your routes.
 */

// Cross-origin resource sharing problem fixed.
app.use(cors({
    origin: "http://localhost:5173", // Allow ONLY your frontend URL
    credentials: true // Allow cookies to be sent with the request
}));

app.use(cookieParser()); // apply middleware to every request to parse the Cookie header into (key, value)
app.use(express.json({ limit: "10mb" })); // apply middleware to every request before reaching routes
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * This means: forward any request that starts with /api/auth to authRoutes -> The router
 * Mounting Routes to URL paths
 */
app.use("/api/messages", messagesRoutes);
app.use("/api/auth", authRoutes)

/**
 * Open a TCP socket on port PORT and start accepting incoming connections
 * connect to mongodb
 */
server.listen(PORT, () => {
    console.log('\n' + `Server is running on port: ${PORT}`)
    connectDB()
})