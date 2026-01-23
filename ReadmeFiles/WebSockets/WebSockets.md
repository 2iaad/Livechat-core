# Deep dive behind the scens

### How the connection between the front & back works

When i call [io(BACKEND_ULR)](../../Frontend/src/store/useAuthStore.ts) (or later socket.connect()), the client:

1. Sends an initial HTTP request to the server’s Socket.IO endpoint (usually /socket.io).
2. They negotiate a transport:
        Often starts as HTTP long-polling, then
        Upgrades to WebSocket if available.
3. Server assigns:
        A session ID (sid)
        A namespace association ("/" or custom)
        Internal server-side Socket instance on that namespace.

* From then on:

    The client Socket ↔ server Socket talk over a persistent connection.
    Messages are framed and encoded with the Socket.IO protocol on top of the underlying transport.
