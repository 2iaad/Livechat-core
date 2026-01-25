## Whats the difference between nodemon and node ? 

node runs your app once.
nodemon runs your app and automatically restarts it when files change.

## Error i encountered: (Coss-origin)

This error happens because your Frontend (running on port 5173) and your Backend (running on port 5001) are on different "origins" (domains/ports). Browsers block these requests by default for security unless the backend explicitly allows them.
Fix: used the `cors` package in the back-end.


## JavaScript objects are always allocated on the heap.

    - in JavaScript, memory management is automatic, leaks are already handled.
    - JS uses Garbage collection -> we need heap allocation.
    - leaks can still exist tho.

## why ts over js ?
    explainning using small example:

```
/** @param {any[]} arr */
    function compact(arr) {
        if (arr.length > 10)
            return arr.trim(0, 10) -> Property 'trim' does not exist on type 'any[]'.
    }
```
    in this case the arr might be an Array that does not have the .trim method. so typing it out in the prototype will let use know the type of the array (map, vetor.. etc) before having the app crashed

## what is an API ?

An API is a set of rules that lets one program ask another program to do something or give it data in a devoloper-defined way.
its an interface for a program to request something from another program (front-end, back-end)

## what is REST API?

A REST API is a way to expose application data by sending an HTTP request to an URL(resource) to transfer a data in a stateless way(The server does not remember anything about previous requests - each request is fully independent - does not need memory to serve content).
