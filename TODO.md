21.10.2021
* pwa install shizzle
* safari, ios
* (!) Circular dependencies
 src\stores.ts -> src\api.ts -> src\stores.ts
 src\websocket.ts -> src\stores.ts -> src\api.ts -> src\websocket.ts
* filter notification for every is involved in a game
* offline detector
