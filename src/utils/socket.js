import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

const createSocketConnection = () => {
    
    const socket = io(BASE_URL, {
        transports: ["polling", "websocket"], // 🔥 TRY POLLING FIRST
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    });
    return socket;

    // const socket = io(BASE_URL);
    // return socket;
};

export default createSocketConnection;