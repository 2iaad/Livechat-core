import express from "express"
import { createServer } from "http";
import { Server, Socket } from "socket.io"

// app : (Request handler) object with methods(use(), get(), post()) to configure http server middleware + routes...
const app = express();
// creating server that handles http/tcp details, with the request handler "app"
const server = createServer(app)

/**
 * 
 * Adding a layer to our server (arg1: http server) (arg2: configuration object)
 * linking Socket.IO into the server by:
 * 		Registering a handler for a path (by default /socket.io).
 * 		Intercepting requests whose URL starts with /socket.io and handling them with the Socket.IO protocol instead of your normal Express routes.
 * Sets up the Socket.IO endpoint
 * 		Exposes an endpoint like:
 * 			http://localhost:3000/socket.io/*
*/

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"], // Only clients coming from http://localhost:5173 are allowed to connect
	}
})



type socketId = string;
type userId = string;
// Record is a built‑in TypeScript utility type that represents an object whose keys and values follow specific types.
type onlineUsers = Record<userId, socketId>

const onlineUsers: onlineUsers = {};

// socket represents the socket we created on the client-side from the front-end.
const callBack = (socket: Socket) => {
	// printer
	console.log(`URL: ${socket.request.url}\nTransport: ${socket.conn.transport.name}\nUser connected: ${socket.id}`);
	socket.conn.on("upgrade", (transport) => {
		console.log("Upgraded transport:", transport.name); // 'websocket'
	});

	// get userId from front-end
	const userId = socket.handshake.query?.userId as string;
	onlineUsers[userId] = socket.id;

	// broadcast a certain event "getOnlineUsers", and a certain object "Object.keys(onlineUsers)"
	socket.emit("xxxGetOnlineUsers", Object.keys(onlineUsers)); // Object.keys() -> to only send the keys

	socket.on('disconnect', () => {
		console.log("User disconnected: ", socket.id)
		// remove user from online users
		delete onlineUsers[userId];
		// let everyone know
		socket.emit("getOnlineUsers", Object.keys(onlineUsers)); // Object.keys() -> to only send the keys
	})
}

io.on('connection', callBack)

export { app, server, io }