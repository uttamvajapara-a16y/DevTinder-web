import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

const createSocketConnection = () => {
    const SOCKET_URL = BASE_URL.replace("/api", "");
    
    const socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"], // 🔥 TRY WEBSOCKET FIRST
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    });
    return socket;
};

export default createSocketConnection;