import express from "express"
import { createServer } from "http";
import { Server, Socket } from "socket.io"

// app : (Request handler) object with methods(use(), get(), post()) to configure http server middleware + routes...
const app = express();
// creating server that handles http/tcp details, with the request handler "app"
const server = createServer(app)

/**
 * adding a layer to our server (arg1: http server) (arg2: configuration object)
 * 	io is an object instace of the Socket.io server
 */
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"], // Only clients coming from http://localhost:5173 are allowed to connect
	}
})

/**
 * Each connection creates a new socket object
 * socket represents one user / one browser tab
 */
const callBack = (socket: Socket) => {
	console.log("User connected: ", socket.id)

	socket.on('disconnect', () => {
		console.log("User disconnected: ", socket.id)
	})
}

io.on('connection', callBack)

export { app, server, io }