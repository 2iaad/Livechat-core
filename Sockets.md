# Transition from Sockets → HTTP → WebSockets

## **Step 0: Raw TCP socket**


*   **What it is:** The lowest-level connection provided by the OS.
    
*   **How it works:**
    
    1.  Server creates a TCP socket (`socket()`)
        
    2.  Binds it to IP + port (`bind()`)
        
    3.  Listens for incoming connections (`listen()`)
        
    4.  Accepts clients (`accept()`), creating a new socket per connection
        
*   **Data flow:** Raw bytes. OS ensures delivery, ordering, retransmissions.
    
*   **Your role in Webserv:** You read/write bytes using `recv()` / `send()` and implemented HTTP on top of the sockets.
    

## **Step 1: Running HTTP over TCP**

*   **What it is:** HTTP is a protocol built **on top of TCP sockets**.
    
*   **How it works:**
    
    1.  Client (browser) opens TCP socket → connects to server
        
    2.  Client (browser) sends **HTTP request bytes** through the socket

        Ex: `GET /index.html HTTP/1.1 Host: example.com`
        
    3.  Server parses bytes → interprets them as HTTP request
        
    4.  Server sends HTTP response bytes back
        
        `HTTP/1.1 200 OK Content-Type: text/html ...`
        
    5.  Connection closes (HTTP/1.0) or stays alive (HTTP/1.1 Keep-Alive)


## **Step 2: WebSocket upgrade (HTTP → WebSocket)**

*   **What it is:** WebSockets allow **real-time, bidirectional messaging** over the same TCP connection.
    
*   **How it works:**
    
    1.  Client opens **HTTP TCP socket** (like normal HTTP request)
        
    2.  Client sends HTTP request with **upgrade headers**:
        
        ```
        GET /chat HTTP/1.1
        Host: example.com
        Upgrade: websocket
        Connection: Upgrade
        Sec-WebSocket-Key: random_value Sec-WebSocket-Version: 13
        ```
        
    3.  Server validates headers, computes `Sec-WebSocket-Accept`
        
    4.  Server responds:

        `HTTP/1.1 101 Switching Protocols Upgrade: websocket Connection: Upgrade Sec-WebSocket-Accept: computed_value`
        
    5.  TCP connection stays open → **HTTP is now replaced by WebSocket protocol**
        
    6.  Both client & server can send **messages at any time** (full-duplex)

**Step 3: WebSocket communication**
-----------------------------------

*   **Data flow:** Messages (text or binary frames) instead of raw HTTP requests
    
*   **Connection:** Persistent until client or server closes
    
*   **Use case:** Real-time chat, notifications, typing indicators, online presence
    

* * *

### **Visual timeline**


```
      [Raw TCP Socket] 
              |
              v
[HTTP Request/Response over TCP] 
              |
              v
  [HTTP Upgrade to WebSocket] 
              |
              v
[Persistent WebSocket Messaging]
```

> WebSockets are not a replacement for TCP — they are a **protocol built on TCP**, starting as HTTP and then switching to full-duplex messaging.  
> Every WebSocket connection = TCP socket + WebSocket protocol.


***

# Notes

### Relation between to (http/https) & sockets:
*   **Http/Https** connections (application-layer) are built on top of **tcp sockets** (transport-layer).

### Can we implement chat using http only ?
*   Yes, we can do so using **Polling**.
*   Client asks the server for new messages repeatedly
    *   this is called polling: `GET /messages every few seconds`

### Difference between Http and WebSockets:


![HTTP vs WebSocket](https://websocket.org/_astro/websocket-vs-http.4fLgja2Z_1Oa32y.webp)


#### Protocol:
*   They both live in the Application layer.
#### Connetion:
*   in http we need to make a new connection for each request.
*   WebSockets provides continious connection.
#### Communication:
*   Https: Unidirectional (client request -> server responds).
*   WebSockets: Bidirectional (client -> server) (server-client).
### Events:
*   Https: the main “event” is the incoming request (a request must be done).
*   WebSockets: Fully event-driven, server can react to any event at any time 
